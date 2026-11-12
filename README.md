# Portfolio

A fast portfolio and blog built with plain HTML and CSS. The site has no build step. The editor bundle is the only built file.

## Structure

- `index.html`: the homepage. The "Writing" section between the `blog:start` and `blog:end` markers is generated.
- `styles/index.css`: shared styles. `styles/blog.css` adds the blog and post styles.
- `blog/`: the generated blog. `posts.json` is the post list, `<slug>/index.html` is each post, and `feed.xml` is the RSS feed.
- `public/`: images and icons. Post media goes in `public/blog/<slug>/`.
- `editor/`: the blog editor at `/editor/`.

## Write a post

1. Open [bardemic.com/editor/](https://bardemic.com/editor/).
2. To connect the editor once, click **Settings** and paste a fine-grained GitHub token. Give the token access to only this repo, with **Contents: Read and write** permission.
3. Write the post. Select text to format it. To add an image or video, drag it in, paste it, or click **+** on an empty line.
4. Click **Publish**.

The editor makes one commit to `main`. The commit adds the post page, uploads the media, and rebuilds the blog index, feed, and homepage list. The site deploys in about a minute. Drafts save in your browser until you publish them.

## Change the editor or templates

```sh
cd editor
bun install
bun run build        # rebuilds editor/app.js
bun run render-blog  # re-renders every blog page after template changes
```

Templates are in `editor/src/templates.js`. The editor and `render-blog` share them.
