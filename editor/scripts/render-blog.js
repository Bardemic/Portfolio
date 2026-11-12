// Re-renders every blog page from blog/posts.json and the post bodies.
// Run after changing templates.js or blog.css markup: bun run render-blog
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderPost, renderBlogIndex, renderFeed, renderManifest, patchHome, extractBody } from "../src/templates.js";

const root = join(import.meta.dir, "../..");
const read = (path) => readFileSync(join(root, path), "utf8");
const write = (path, text) => writeFileSync(join(root, path), text);

const { posts } = JSON.parse(read("blog/posts.json"));
for (const post of posts) {
  const path = `blog/${post.slug}/index.html`;
  write(path, renderPost(post, extractBody(read(path))));
}
write("blog/posts.json", renderManifest(posts));
write("blog/index.html", renderBlogIndex(posts));
write("blog/feed.xml", renderFeed(posts));
write("index.html", patchHome(read("index.html"), posts));
console.log(`Rendered ${posts.length} posts.`);
