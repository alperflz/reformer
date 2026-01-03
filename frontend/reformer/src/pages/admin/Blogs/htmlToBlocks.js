// htmlToBlocks.js
export function htmlToBlocks(html) {
  const div = document.createElement("div");
  div.innerHTML = html;

  const blocks = [];

  div.childNodes.forEach((node) => {
    if (node.nodeType !== 1) return;

    if (node.tagName === "P") {
      blocks.push({
        id: Date.now() + Math.random(),
        type: "paragraph",
        value: node.innerText,
      });
    }

    if (node.tagName === "H1" || node.tagName === "H2") {
      blocks.push({
        id: Date.now() + Math.random(),
        type: "heading",
        value: node.innerText,
      });
    }

    if (node.tagName === "BLOCKQUOTE") {
      blocks.push({
        id: Date.now() + Math.random(),
        type: "quote",
        value: node.innerText,
      });
    }

    if (node.tagName === "UL") {
      const items = [...node.querySelectorAll("li")].map(
        (li) => li.innerText
      );
      blocks.push({
        id: Date.now() + Math.random(),
        type: "list",
        items,
      });
    }

    if (node.tagName === "IMG") {
      blocks.push({
        id: Date.now() + Math.random(),
        type: "image",
        value: node.getAttribute("src"),
      });
    }
  });

  return blocks.length ? blocks : [
    { id: Date.now(), type: "paragraph", value: "" }
  ];
}
