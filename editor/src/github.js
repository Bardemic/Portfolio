// Minimal GitHub REST client. Every publish is one commit made with the Git
// Data API, so the site deploys once per publish.

const API = "https://api.github.com";

export function utf8ToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

export function base64ToUtf8(base64) {
  const binary = atob(base64.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export class GitHub {
  constructor({ token, repo, branch }) {
    this.token = token;
    this.repo = repo;
    this.branch = branch;
  }

  async request(path, options = {}) {
    const response = await fetch(`${API}/repos/${this.repo}${path}`, {
      ...options,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${this.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
      },
    });
    if (response.status === 404) return null;
    if (!response.ok) {
      const detail = await response.json().catch(() => ({}));
      const error = new Error(detail.message || `GitHub returned ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return response.status === 204 ? null : response.json();
  }

  async check() {
    const repo = await this.request("");
    if (!repo) throw new Error(`Cannot find ${this.repo}. Check the repo name and token access.`);
    if (!repo.permissions?.push) throw new Error("This token cannot write to the repo.");
    const branch = await this.request(`/branches/${encodeURIComponent(this.branch)}`);
    if (!branch) throw new Error(`Branch "${this.branch}" does not exist.`);
  }

  async readText(path) {
    const file = await this.request(`/contents/${path}?ref=${encodeURIComponent(this.branch)}`);
    return file ? base64ToUtf8(file.content) : null;
  }

  async listFiles(prefix) {
    const head = await this.request(`/git/ref/heads/${encodeURIComponent(this.branch)}`);
    const tree = await this.request(`/git/trees/${head.object.sha}?recursive=1`);
    return tree.tree.filter((entry) => entry.type === "blob" && entry.path.startsWith(prefix)).map((entry) => entry.path);
  }

  // changes: [{ path, text }] | [{ path, base64 }] | [{ path, delete: true }]
  async commit(message, changes, attempt = 0) {
    const ref = await this.request(`/git/ref/heads/${encodeURIComponent(this.branch)}`);
    const parent = await this.request(`/git/commits/${ref.object.sha}`);
    const tree = await Promise.all(
      changes.map(async (change) => {
        const entry = { path: change.path, mode: "100644", type: "blob" };
        if (change.delete) return { ...entry, sha: null };
        if (change.text !== undefined) return { ...entry, content: change.text };
        const blob = await this.request("/git/blobs", {
          method: "POST",
          body: JSON.stringify({ content: change.base64, encoding: "base64" }),
        });
        return { ...entry, sha: blob.sha };
      }),
    );
    const newTree = await this.request("/git/trees", {
      method: "POST",
      body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
    });
    const commit = await this.request("/git/commits", {
      method: "POST",
      body: JSON.stringify({ message, tree: newTree.sha, parents: [ref.object.sha] }),
    });
    try {
      await this.request(`/git/refs/heads/${encodeURIComponent(this.branch)}`, {
        method: "PATCH",
        body: JSON.stringify({ sha: commit.sha }),
      });
    } catch (error) {
      // Someone pushed between our read and write. Rebuild on the new head once.
      if (error.status === 422 && attempt === 0) return this.commit(message, changes, 1);
      throw error;
    }
    return commit;
  }
}
