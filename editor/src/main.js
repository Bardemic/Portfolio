import { Editor, Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import FloatingMenu from "@tiptap/extension-floating-menu";
import { Placeholder } from "@tiptap/extensions";
import { GitHub } from "./github.js";
import { drafts, settings } from "./store.js";
import { prepareImage, prepareVideo, dataUrlToFile } from "./media.js";
import {
  slugify,
  formatDate,
  sortPosts,
  renderPost,
  renderBlogIndex,
  renderManifest,
  renderFeed,
  patchHome,
  extractBody,
  SITE_URL,
} from "./templates.js";

const $ = (selector) => document.querySelector(selector);
const ui = {
  title: $("#title"),
  description: $("#description"),
  date: $("#date"),
  slug: $("#slug"),
  status: $("#status"),
  publish: $("#publish"),
  viewLive: $("#view-live"),
  panel: $("#posts-panel"),
  postsList: $("#posts-list"),
  textMenu: $("#text-menu"),
  linkForm: $("#link-form"),
  imageMenu: $("#image-menu"),
  insertMenu: $("#insert-menu"),
  insertOptions: $("#insert-options"),
  pickImage: $("#pick-image"),
  pickVideo: $("#pick-video"),
  settings: $("#settings"),
  toast: $("#toast"),
};

let config = settings.load();
let manifest = [];
let current = null;

// ---------------------------------------------------------------- editor

const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes: () => ({ src: { default: null } }),
  parseHTML: () => [{ tag: "video[src]" }],
  renderHTML: ({ HTMLAttributes }) => ["video", mergeAttributes({ controls: "", playsinline: "", preload: "metadata" }, HTMLAttributes)],
  addCommands() {
    return { setVideo: (attrs) => ({ commands }) => commands.insertContent({ type: this.name, attrs }) };
  },
});

const isMedia = (editor) => editor.isActive("image") || editor.isActive("video") || editor.isActive("youtube");

const editor = new Editor({
  element: $("#editor"),
  extensions: [
    StarterKit.configure({
      heading: { levels: [2, 3] },
      link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
    }),
    Image.configure({ allowBase64: true }),
    Video,
    Youtube.configure({ nocookie: true, width: 640, height: 360 }),
    Placeholder.configure({ placeholder: "Start writing. Select text to format it. Drop or paste images anywhere." }),
    BubbleMenu.configure({
      pluginKey: "textMenu",
      element: ui.textMenu,
      options: { placement: "top", offset: 10 },
      shouldShow: ({ editor, state, from, to }) =>
        !state.selection.empty && !isMedia(editor) && !editor.isActive("codeBlock") && state.doc.textBetween(from, to).trim().length > 0,
    }),
    BubbleMenu.extend({ name: "imageMenu" }).configure({
      pluginKey: "imageMenu",
      element: ui.imageMenu,
      options: { placement: "top", offset: 10 },
      shouldShow: ({ editor }) => isMedia(editor),
    }),
    FloatingMenu.configure({
      element: ui.insertMenu,
      options: { placement: window.innerWidth > 860 ? "left" : "right", offset: window.innerWidth > 860 ? 18 : 0 },
    }),
  ],
  editorProps: {
    attributes: { class: "post-body" },
    handleDrop(view, event, _slice, moved) {
      const files = [...(event.dataTransfer?.files ?? [])];
      if (moved || !files.length) return false;
      event.preventDefault();
      const position = view.posAtCoords({ left: event.clientX, top: event.clientY });
      insertFiles(files, position?.pos);
      return true;
    },
    handlePaste(_view, event) {
      const files = [...(event.clipboardData?.files ?? [])].filter((file) => /^(image|video)\//.test(file.type));
      if (!files.length) return false;
      insertFiles(files);
      return true;
    },
  },
  onUpdate: () => markChanged(),
  onTransaction: () => refreshMenus(),
});

function refreshMenus() {
  for (const button of ui.textMenu.querySelectorAll("[data-mark]")) {
    const [name, level] = button.dataset.mark.split(":");
    button.classList.toggle("is-active", editor.isActive(name, level ? { level: Number(level) } : undefined));
  }
}

const actions = {
  bold: () => editor.chain().focus().toggleBold().run(),
  italic: () => editor.chain().focus().toggleItalic().run(),
  strike: () => editor.chain().focus().toggleStrike().run(),
  code: () => editor.chain().focus().toggleCode().run(),
  h2: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  h3: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  quote: () => editor.chain().focus().toggleBlockquote().run(),
  link: () => {
    if (editor.isActive("link")) return editor.chain().focus().extendMarkRange("link").unsetLink().run();
    ui.textMenu.classList.add("is-linking");
    const input = ui.linkForm.querySelector("input");
    input.value = "";
    input.focus();
  },
  image: () => ui.pickImage.click(),
  video: () => ui.pickVideo.click(),
  youtube: () => {
    const url = window.prompt("Paste a YouTube link");
    if (url && !editor.chain().focus().setYoutubeVideo({ src: url }).run()) toast("That does not look like a YouTube link.");
  },
  divider: () => editor.chain().focus().setHorizontalRule().run(),
  codeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
  list: () => editor.chain().focus().toggleBulletList().run(),
  alt: () => {
    const alt = window.prompt("Describe the image for screen readers", editor.getAttributes("image").alt || "");
    if (alt !== null) editor.chain().focus().updateAttributes("image", { alt }).run();
  },
  removeMedia: () => editor.chain().focus().deleteSelection().run(),
};

for (const menu of [ui.textMenu, ui.imageMenu, ui.insertMenu]) {
  // Keep the text selection alive while a menu button takes the click.
  menu.addEventListener("mousedown", (event) => {
    if (event.target.closest("button")) event.preventDefault();
  });
  menu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    actions[button.dataset.action]();
    ui.insertOptions.hidden = true;
  });
}

editor.on("selectionUpdate", () => {
  ui.imageMenu.querySelector('[data-action="alt"]').hidden = !editor.isActive("image");
  ui.textMenu.classList.remove("is-linking");
});

$("#insert-toggle").addEventListener("click", () => {
  ui.insertOptions.hidden = !ui.insertOptions.hidden;
});

ui.linkForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const href = ui.linkForm.querySelector("input").value.trim();
  ui.textMenu.classList.remove("is-linking");
  if (href) editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
});
ui.linkForm.querySelector("input").addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    ui.textMenu.classList.remove("is-linking");
    editor.commands.focus();
  }
});

async function insertFiles(files, position) {
  for (const file of files) {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo && !file.type.startsWith("image/")) continue;
    toast(isVideo ? "Adding video…" : "Adding image…");
    try {
      const src = isVideo ? await prepareVideo(file) : await prepareImage(file);
      const node = { type: isVideo ? "video" : "image", attrs: { src } };
      const chain = editor.chain().focus();
      (position == null ? chain.insertContent(node) : chain.insertContentAt(position, node)).run();
      position = null;
      toast(isVideo ? "Video added" : "Image added");
    } catch (error) {
      toast(error.message, true);
    }
  }
}

for (const picker of [ui.pickImage, ui.pickVideo]) {
  picker.addEventListener("change", () => {
    insertFiles([...picker.files]);
    picker.value = "";
  });
}

// ---------------------------------------------------------------- drafts

const today = () => new Date().toLocaleDateString("en-CA");
const newId = () => `draft-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function blankDraft() {
  return { id: newId(), title: "", description: "", slug: "", slugEdited: false, date: today(), html: "", publishedSlug: null, dirty: true, updatedAt: Date.now() };
}

function slugFor(draft) {
  return draft.slug || slugify(draft.title) || "untitled";
}

function openDraft(draft) {
  current = draft;
  ui.title.value = draft.title;
  ui.description.value = draft.description;
  ui.date.value = draft.date;
  ui.slug.value = draft.slugEdited || draft.publishedSlug ? draft.slug : "";
  ui.slug.placeholder = slugify(draft.title) || "post-url";
  editor.commands.setContent(draft.html || "", { emitUpdate: false });
  fitTitle();
  updateStatus();
  renderPostsList();
  localStorage.setItem("blog-editor:last", draft.id);
  if (!draft.title) ui.title.focus();
}

let saveTimer;
function markChanged() {
  if (!current) return;
  current.dirty = true;
  current.updatedAt = Date.now();
  updateStatus("Saving…");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 400);
}

async function saveNow() {
  clearTimeout(saveTimer);
  if (!current) return;
  current.html = editor.isEmpty ? "" : editor.getHTML();
  await drafts.put(current);
  updateStatus();
  renderPostsList();
}

function updateStatus(text) {
  const published = Boolean(current?.publishedSlug);
  ui.status.textContent =
    text ?? (!config.token ? "Saved on this device. Connect GitHub to publish." : published && !current.dirty ? "Published" : published ? "Unpublished changes" : "Draft saved on this device");
  ui.publish.textContent = published ? "Update" : "Publish";
  ui.publish.disabled = published && !current.dirty;
  ui.viewLive.hidden = !published;
  if (published) ui.viewLive.href = `${SITE_URL}/blog/${current.publishedSlug}/`;
}

ui.title.addEventListener("input", () => {
  current.title = ui.title.value.replace(/\n/g, " ");
  if (!current.slugEdited && !current.publishedSlug) current.slug = "";
  ui.slug.placeholder = slugify(current.title) || "post-url";
  fitTitle();
  markChanged();
});
ui.title.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    editor.commands.focus("start");
  }
});
ui.description.addEventListener("input", () => {
  current.description = ui.description.value;
  markChanged();
});
ui.date.addEventListener("input", () => {
  current.date = ui.date.value || today();
  markChanged();
});
ui.slug.addEventListener("input", () => {
  current.slug = slugify(ui.slug.value);
  current.slugEdited = Boolean(ui.slug.value);
  markChanged();
});
ui.slug.addEventListener("blur", () => {
  if (current.slugEdited) ui.slug.value = current.slug;
});

function fitTitle() {
  ui.title.style.height = "auto";
  ui.title.style.height = `${ui.title.scrollHeight}px`;
}

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "s") {
    event.preventDefault();
    saveNow().then(() => toast("Saved on this device"));
  }
});
document.addEventListener("visibilitychange", () => document.hidden && saveNow());

// ---------------------------------------------------------------- posts panel

async function loadManifest() {
  try {
    const text = config.token ? await github().readText("blog/posts.json") : await fetch("/blog/posts.json").then((r) => (r.ok ? r.text() : null));
    manifest = text ? JSON.parse(text).posts : [];
  } catch (error) {
    toast(`Could not load posts: ${error.message}`, true);
  }
  renderPostsList();
}

async function renderPostsList() {
  const local = await drafts.all();
  const bySlug = new Map(local.filter((draft) => draft.publishedSlug).map((draft) => [draft.publishedSlug, draft]));
  const unpublished = local.filter((draft) => !draft.publishedSlug).sort((a, b) => b.updatedAt - a.updatedAt);
  const rows = [
    ...unpublished.map((draft) => ({ key: draft.id, title: draft.title || "Untitled", label: "Draft", detail: "On this device", draft })),
    ...sortPosts(manifest).map((post) => {
      const draft = bySlug.get(post.slug);
      return { key: post.slug, title: post.title, label: draft?.dirty ? "Edited" : "Live", detail: formatDate(post.date), draft, post };
    }),
  ];
  ui.postsList.replaceChildren(
    ...rows.map((row) => {
      const item = document.createElement("div");
      item.className = "post-item";
      item.classList.toggle("is-current", row.draft?.id === current?.id || (row.post && row.post.slug === current?.publishedSlug));
      item.innerHTML = `<button class="post-open"><span class="post-title"></span><span class="post-detail"></span></button><button class="post-delete" aria-label="Delete">Delete</button>`;
      item.querySelector(".post-title").textContent = row.title;
      item.querySelector(".post-detail").textContent = `${row.label} · ${row.detail}`;
      item.querySelector(".post-open").addEventListener("click", () => openRow(row));
      item.querySelector(".post-delete").addEventListener("click", () => deleteRow(row));
      return item;
    }),
  );
  if (!rows.length) ui.postsList.innerHTML = `<p class="empty">No posts yet.</p>`;
}

async function openRow(row) {
  await saveNow();
  if (row.draft) return openDraft(row.draft);
  try {
    const page = config.token ? await github().readText(`blog/${row.post.slug}/index.html`) : await fetch(`/blog/${row.post.slug}/`).then((r) => r.text());
    openDraft({ ...blankDraft(), ...row.post, slugEdited: true, publishedSlug: row.post.slug, html: extractBody(page || ""), dirty: false });
    await drafts.put(current);
  } catch (error) {
    toast(`Could not open post: ${error.message}`, true);
  }
  if (window.innerWidth < 860) ui.panel.hidden = true;
}

async function deleteRow(row) {
  if (!row.post) {
    if (!window.confirm(`Delete the draft "${row.title}"? You cannot undo this.`)) return;
    await drafts.remove(row.draft.id);
    if (current?.id === row.draft.id) openDraft(blankDraft());
    return renderPostsList();
  }
  if (!requireToken()) return;
  if (!window.confirm(`Remove "${row.title}" from bardemic.com? The post and its media are deleted from the repo.`)) return;
  try {
    toast("Removing post…");
    const gh = github();
    const slug = row.post.slug;
    const posts = (await readManifest(gh)).filter((post) => post.slug !== slug);
    const media = await gh.listFiles(`public/blog/${slug}/`);
    await gh.commit(`Remove blog post "${row.post.title}"`, [
      { path: `blog/${slug}/index.html`, delete: true },
      ...media.map((path) => ({ path, delete: true })),
      ...(await siteFiles(gh, posts)),
    ]);
    manifest = posts;
    if (row.draft) await drafts.remove(row.draft.id);
    if (current?.publishedSlug === slug) openDraft(blankDraft());
    renderPostsList();
    toast("Post removed. The site updates in about a minute.");
  } catch (error) {
    toast(`Could not remove post: ${error.message}`, true);
  }
}

$("#toggle-posts").addEventListener("click", () => {
  ui.panel.hidden = !ui.panel.hidden;
});
$("#new-post").addEventListener("click", async () => {
  await saveNow();
  openDraft(blankDraft());
  if (window.innerWidth < 860) ui.panel.hidden = true;
});

// ---------------------------------------------------------------- publish

function github() {
  return new GitHub(config);
}

function requireToken() {
  if (config.token) return true;
  openSettings();
  return false;
}

async function readManifest(gh) {
  const text = await gh.readText("blog/posts.json");
  return text ? JSON.parse(text).posts : [];
}

// Files that list posts. They are rebuilt on every publish and delete.
async function siteFiles(gh, posts) {
  const home = await gh.readText("index.html");
  return [
    { path: "blog/posts.json", text: renderManifest(posts) },
    { path: "blog/index.html", text: renderBlogIndex(posts) },
    { path: "blog/feed.xml", text: renderFeed(posts) },
    { path: "index.html", text: patchHome(home, posts) },
  ];
}

// Swaps embedded data URLs for uploaded files under public/blog/<slug>/.
async function extractMedia(html, slug) {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const uploads = new Map();
  for (const element of doc.querySelectorAll('img[src^="data:"], video[src^="data:"]')) {
    const { base64, name } = await dataUrlToFile(element.getAttribute("src"));
    const path = `public/blog/${slug}/${name}`;
    uploads.set(path, base64);
    element.setAttribute("src", `/${path}`);
  }
  return { html: doc.body.innerHTML, uploads: [...uploads].map(([path, base64]) => ({ path, base64 })) };
}

async function publish() {
  if (!requireToken()) return;
  await saveNow();
  const draft = current;
  if (!draft.title.trim()) return toast("Add a title first.", true);
  if (editor.isEmpty) return toast("Write something first.", true);
  const slug = slugFor(draft);
  if (manifest.some((post) => post.slug === slug) && slug !== draft.publishedSlug) {
    return toast(`Another post already uses /blog/${slug}/. Change the URL.`, true);
  }

  ui.publish.disabled = true;
  updateStatus("Publishing…");
  try {
    const gh = github();
    const { html, uploads } = await extractMedia(draft.html, slug);
    const entry = { slug, title: draft.title.trim(), description: draft.description.trim(), date: draft.date };
    const posts = [...(await readManifest(gh)).filter((post) => post.slug !== slug && post.slug !== draft.publishedSlug), entry];
    const moved = draft.publishedSlug && draft.publishedSlug !== slug;
    await gh.commit(`${draft.publishedSlug ? "Update" : "Publish"} blog post "${entry.title}"`, [
      ...uploads,
      { path: `blog/${slug}/index.html`, text: renderPost(entry, html) },
      ...(moved ? [{ path: `blog/${draft.publishedSlug}/index.html`, delete: true }] : []),
      ...(await siteFiles(gh, posts)),
    ]);
    Object.assign(draft, { slug, slugEdited: true, publishedSlug: slug, dirty: false });
    await drafts.put(draft);
    manifest = posts;
    ui.slug.value = slug;
    updateStatus();
    renderPostsList();
    toast(`Published. It is live at ${SITE_URL.replace("https://", "")}/blog/${slug}/ in about a minute.`);
  } catch (error) {
    updateStatus();
    toast(`Publish failed: ${error.message}`, true);
  }
}

ui.publish.addEventListener("click", publish);

// ---------------------------------------------------------------- settings

function openSettings() {
  const form = ui.settings.querySelector("form");
  form.token.value = config.token;
  form.repo.value = config.repo;
  form.branch.value = config.branch;
  $("#settings-error").textContent = "";
  ui.settings.showModal();
}

$("#open-settings").addEventListener("click", openSettings);
$("#settings-cancel").addEventListener("click", () => ui.settings.close());
ui.settings.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const next = { token: form.token.value.trim(), repo: form.repo.value.trim(), branch: form.branch.value.trim() };
  const error = $("#settings-error");
  error.textContent = "Checking access…";
  try {
    if (next.token) await new GitHub(next).check();
    config = next;
    settings.save(config);
    ui.settings.close();
    updateStatus();
    loadManifest();
    toast(next.token ? `Connected to ${next.repo}` : "Disconnected");
  } catch (failure) {
    error.textContent = failure.message;
  }
});

// ---------------------------------------------------------------- toast

let toastTimer;
function toast(message, isError = false) {
  ui.toast.textContent = message;
  ui.toast.classList.toggle("is-error", isError);
  ui.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove("is-visible"), isError ? 6000 : 3500);
}

// ---------------------------------------------------------------- start

const lastId = localStorage.getItem("blog-editor:last");
openDraft((lastId && (await drafts.get(lastId))) || blankDraft());
if (window.innerWidth >= 1180) ui.panel.hidden = false;
loadManifest();
