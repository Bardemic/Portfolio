// Drafts live in IndexedDB so embedded images and videos fit (localStorage
// caps out around 5 MB). Settings are small and stay in localStorage.

const DB_NAME = "blog-editor";
const STORE = "drafts";

let dbPromise;
function db() {
  dbPromise ??= new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

async function run(mode, action) {
  const database = await db();
  return new Promise((resolve, reject) => {
    const request = action(database.transaction(STORE, mode).objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const drafts = {
  all: () => run("readonly", (store) => store.getAll()),
  get: (id) => run("readonly", (store) => store.get(id)),
  put: (draft) => run("readwrite", (store) => store.put(draft)),
  remove: (id) => run("readwrite", (store) => store.delete(id)),
};

const SETTINGS_KEY = "blog-editor:settings";
const DEFAULT_SETTINGS = { token: "", repo: "Bardemic/Portfolio", branch: "main" };

export const settings = {
  load: () => ({ ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") }),
  save: (value) => localStorage.setItem(SETTINGS_KEY, JSON.stringify(value)),
};
