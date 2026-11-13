# Portfolio (Static HTML + CSS)

This repository contains a simple, fast portfolio and blog built with plain HTML and CSS. No build step required.

## Structure

- `index.html`: main landing page
- `styles/main.css`: shared styles
- `public/`: images and icons
- `blog/index.html`: blog home
- `blog/<post>.html`: individual posts

## Development

Open `index.html` directly in a browser or serve the folder with any static server (e.g. VS Code Live Server).

## Add a blog post

1. Duplicate `blog/sample-post.html` and rename it (e.g. `blog/my-post.html`).
2. Edit the new file’s `<title>`, `<h1>`, date, and content.
3. Add a new entry to `blog/index.html` inside the `.post-list` linking to your new file.

That’s it.