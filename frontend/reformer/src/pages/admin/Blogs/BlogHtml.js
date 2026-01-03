// blogHtml.js
const escapeHtml = (s = "") =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const blocksToHtml = (blocks = []) => {
  return blocks
    .map((b) => {
      const v = (b.value ?? "").toString().trim();

      if (b.type === "heading") return v ? `<h2>${escapeHtml(v)}</h2>` : "";
      if (b.type === "paragraph") return v ? `<p>${escapeHtml(v)}</p>` : "";
      if (b.type === "quote")
        return v ? `<blockquote>${escapeHtml(v)}</blockquote>` : "";
      if (b.type === "list") {
        const items = (b.items || []).map((x) => x.trim()).filter(Boolean);
        if (!items.length) return "";
        return `<ul>${items
          .map((it) => `<li>${escapeHtml(it)}</li>`)
          .join("")}</ul>`;
      }
      if (b.type === "image") {
        return v ? `<img src="${escapeHtml(v)}" alt="" />` : "";
      }
      return "";
    })
    .filter(Boolean)
    .join("");
};
