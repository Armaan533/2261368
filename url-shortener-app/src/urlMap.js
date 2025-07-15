export const urlMap = new Map(JSON.parse(localStorage.getItem("urlMap") || "[]"));

export function saveUrlMap() {
  localStorage.setItem("urlMap", JSON.stringify(Array.from(urlMap.entries())));
}