// Turns dropped, pasted, or picked files into data URLs that the editor can
// show right away. Publishing later uploads them as real files.

const MAX_IMAGE_WIDTH = 1600;
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

function readAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// Resizes large photos and re-encodes them as WebP. GIFs and SVGs pass
// through so animation and vectors survive.
export async function prepareImage(file) {
  if (/image\/(gif|svg)/.test(file.type)) return readAsDataUrl(file);
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const webp = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.86));
  return readAsDataUrl(webp && webp.size < file.size ? webp : file);
}

export async function prepareVideo(file) {
  if (file.size > MAX_VIDEO_BYTES) {
    throw new Error(`Videos must be under 50 MB. This one is ${Math.round(file.size / 1024 / 1024)} MB. Upload it to YouTube and paste the link instead.`);
  }
  return readAsDataUrl(file);
}

const EXTENSIONS = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

// Splits a data URL into what the GitHub API needs and a stable file name.
export async function dataUrlToFile(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.slice(5).split(";")[0];
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hash = [...new Uint8Array(digest)].slice(0, 6).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return { base64, name: `${hash}.${EXTENSIONS[mime] || "bin"}` };
}
