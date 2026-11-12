// Renders the static blog pages. Shared by the editor (in the browser) and
// scripts/render-blog.js (in Bun), so both always produce identical files.

export const SITE_URL = "https://bardemic.com";
export const AUTHOR = "Brandon Pieczka";
const HOME_START = "<!-- blog:start -->";
const HOME_END = "<!-- blog:end -->";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function slugify(title) {
  return String(title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

export function formatDate(iso) {
  const { year, month, day } = parseDate(iso);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export function formatMonth(iso) {
  const { year, month } = parseDate(iso);
  return `${MONTHS[month - 1]} ${year}`;
}

export function readingTime(html) {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function sortPosts(posts) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

function firstImage(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  if (!match) return null;
  return match[1].startsWith("/") ? SITE_URL + match[1] : match[1];
}

function head({ title, description, url, image, type }) {
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(description)}" />
    <title>${escapeHtml(title)}</title>
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />${image ? `\n    <meta property="og:image" content="${escapeHtml(image)}" />` : ""}
    <meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />
    <link rel="icon" href="/public/favicon.svg?v=2" />
    <link rel="alternate" type="application/rss+xml" title="${AUTHOR}" href="/blog/feed.xml" />
    <link rel="stylesheet" href="/styles/index.css?v=3" />
    <link rel="stylesheet" href="/styles/blog.css?v=1" />`;
}

export function renderPost(post, bodyHtml) {
  const url = `${SITE_URL}/blog/${post.slug}/`;
  return `<!doctype html>
<html lang="en">
  <head>
${head({ title: `${post.title} — ${AUTHOR}`, description: post.description || post.title, url, image: firstImage(bodyHtml), type: "article" })}
  </head>
  <body>
    <main>
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">${AUTHOR}</a><span aria-hidden="true">/</span><a href="/blog/">Writing</a></nav>
      <article>
        <header class="post-header">
          <h1>${escapeHtml(post.title)}</h1>
          <p class="post-meta"><time datetime="${post.date}">${formatDate(post.date)}</time> · ${readingTime(bodyHtml)} min read</p>
        </header>
        <div class="post-body">
${bodyHtml}
        </div>
      </article>
      <footer><a href="/blog/">← All writing</a></footer>
    </main>
  </body>
</html>
`;
}

function postRow(post, href) {
  return `<li><a class="row" href="${href}">
            <span class="name">${escapeHtml(post.title)}</span>
            <span class="description">${escapeHtml(post.description)}</span>
            <span class="year">${formatMonth(post.date)}</span>
          </a></li>`;
}

export function renderBlogIndex(posts) {
  const sorted = sortPosts(posts);
  const rows = sorted.length
    ? sorted.map((post) => `          ${postRow(post, `/blog/${post.slug}/`)}`).join("\n")
    : `          <li class="empty">Nothing here yet.</li>`;
  return `<!doctype html>
<html lang="en">
  <head>
${head({ title: `Writing — ${AUTHOR}`, description: `Writing by ${AUTHOR}.`, url: `${SITE_URL}/blog/`, image: null, type: "website" })}
  </head>
  <body>
    <main>
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">${AUTHOR}</a><span aria-hidden="true">/</span><span>Writing</span></nav>
      <header>
        <h1>Writing</h1>
        <p class="intro">Notes on things I build and learn. <a href="/blog/feed.xml">RSS</a></p>
      </header>
      <section aria-label="Posts">
        <ul class="post-list">
${rows}
        </ul>
      </section>
    </main>
  </body>
</html>
`;
}

// Replaces the marked block in the homepage with the latest posts.
export function patchHome(indexHtml, posts) {
  const start = indexHtml.indexOf(HOME_START);
  const end = indexHtml.indexOf(HOME_END);
  if (start === -1 || end === -1) throw new Error("index.html is missing the blog markers");
  const latest = sortPosts(posts).slice(0, 4);
  const block = latest.length
    ? `
      <section aria-labelledby="writing">
        <h2 id="writing">Writing</h2>
        <ul class="post-list">
${latest.map((post) => `          ${postRow(post, `blog/${post.slug}/`)}`).join("\n")}
        </ul>${posts.length > latest.length ? `\n        <p class="more"><a href="blog/">All writing</a></p>` : ""}
      </section>
      `
    : "\n      ";
  return indexHtml.slice(0, start + HOME_START.length) + block + indexHtml.slice(end);
}

export function renderFeed(posts) {
  const items = sortPosts(posts)
    .map(
      (post) => `    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid>${SITE_URL}/blog/${post.slug}/</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeHtml(post.description)}</description>
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${AUTHOR}</title>
    <link>${SITE_URL}/blog/</link>
    <description>Writing by ${AUTHOR}.</description>
${items}
  </channel>
</rss>
`;
}

export function renderManifest(posts) {
  return `${JSON.stringify({ posts: sortPosts(posts) }, null, 2)}\n`;
}

// Pulls the editable body back out of a rendered post page.
export function extractBody(postHtml) {
  const open = '<div class="post-body">';
  const start = postHtml.indexOf(open);
  const end = postHtml.lastIndexOf("</div>\n      </article>");
  if (start === -1 || end === -1) return "";
  return postHtml.slice(start + open.length, end).trim();
}
