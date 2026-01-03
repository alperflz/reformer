// BlogBlocksEditor.jsx
import { useMemo } from "react";

const LABELS = {
    heading: "Başlık",
    paragraph: "Paragraf",
    quote: "Alıntı",
    list: "Liste",
    image: "Görsel (URL)",
};

export default function BlogBlocksEditor({ blocks, setBlocks }) {
    const hasBlocks = blocks?.length > 0;

    const addBlock = (type) => {
        const id = Date.now() + Math.random();
        if (type === "list") {
            setBlocks((prev) => [...prev, { id, type, items: [""] }]);
            return;
        }
        setBlocks((prev) => [...prev, { id, type, value: "" }]);
    };

    const removeBlock = (id) =>
        setBlocks((prev) => prev.filter((b) => b.id !== id));

    const move = (index, dir) => {
        setBlocks((prev) => {
            const next = [...prev];
            const to = index + dir;
            if (to < 0 || to >= next.length) return prev;
            [next[index], next[to]] = [next[to], next[index]];
            return next;
        });
    };

    const updateValue = (id, value) =>
        setBlocks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, value } : b))
        );

    const updateListItem = (id, idx, value) =>
        setBlocks((prev) =>
            prev.map((b) => {
                if (b.id !== id) return b;
                const items = [...(b.items || [])];
                items[idx] = value;
                return { ...b, items };
            })
        );

    const addListItem = (id) =>
        setBlocks((prev) =>
            prev.map((b) =>
                b.id === id ? { ...b, items: [...(b.items || []), ""] } : b
            )
        );

    const removeListItem = (id, idx) =>
        setBlocks((prev) =>
            prev.map((b) => {
                if (b.id !== id) return b;
                const items = [...(b.items || [])];
                items.splice(idx, 1);
                return { ...b, items: items.length ? items : [""] };
            })
        );

    const tips = useMemo(
        () => [
            "Başlık eklemek için “+ Başlık”",
            "Paragraf yazmak için “+ Paragraf”",
            "Alıntı için “+ Alıntı”",
            "Liste için “+ Liste”",
            "Görsel için URL yapıştır",
        ],
        []
    );

    return (
        <div className="admin-blog-editor">
            {!hasBlocks && (
                <div className="admin-blog-help" style={{ marginBottom: 10 }}>
                    İçerik bloklardan oluşur. Blog yazmak için aşağıdan blok ekleyin.
                </div>
            )}

            <div className="admin-blog-help" style={{ marginBottom: 14 }}>
                <b>İpucu:</b> {tips.join(" · ")}
            </div>

            {(blocks || []).map((b, i) => (
                <div className="admin-blog-block" key={b.id}>
                    <div className="admin-blog-block-head">
                        <div className="admin-blog-block-type">
                            {LABELS[b.type] || b.type}
                        </div>
                        <div className="admin-blog-block-controls">
                            <button
                                className="admin-blog-icon-btn"
                                onClick={() => move(i, -1)}
                                title="Yukarı"
                            >
                                ↑
                            </button>
                            <button
                                className="admin-blog-icon-btn"
                                onClick={() => move(i, 1)}
                                title="Aşağı"
                            >
                                ↓
                            </button>
                            <button
                                className="admin-blog-icon-btn"
                                onClick={() => removeBlock(b.id)}
                                title="Sil"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {b.type === "heading" && (
                        <input
                            className="admin-blog-input"
                            placeholder="Bölüm başlığı yazın..."
                            value={b.value || ""}
                            onChange={(e) =>
                                updateValue(b.id, e.target.value)
                            }
                        />
                    )}

                    {b.type === "paragraph" && (
                        <textarea
                            className="admin-blog-input"
                            placeholder="Paragraf yazın..."
                            value={b.value || ""}
                            onChange={(e) =>
                                updateValue(b.id, e.target.value)
                            }
                        />
                    )}

                    {b.type === "quote" && (
                        <textarea
                            className="admin-blog-input"
                            placeholder="Alıntı yazın..."
                            value={b.value || ""}
                            onChange={(e) =>
                                updateValue(b.id, e.target.value)
                            }
                        />
                    )}

                    {b.type === "image" && (
                        <>
                            <input
                                className="admin-blog-input"
                                placeholder="https://... görsel URL"
                                value={b.value || ""}
                                onChange={(e) =>
                                    updateValue(b.id, e.target.value)
                                }
                            />
                            <div className="admin-blog-help">
                                İçerik içinde şimdilik URL ile görsel eklenir.
                            </div>
                        </>
                    )}

                    {b.type === "list" && (
                        <>
                            {(b.items || []).map((it, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: "flex",
                                        gap: 8,
                                        marginBottom: 8,
                                    }}
                                >
                                    <input
                                        className="admin-blog-input"
                                        placeholder={`Liste öğesi #${idx + 1}`}
                                        value={it || ""}
                                        onChange={(e) =>
                                            updateListItem(
                                                b.id,
                                                idx,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        className="admin-blog-icon-btn"
                                        onClick={() =>
                                            removeListItem(b.id, idx)
                                        }
                                        title="Sil"
                                    >
                                        −
                                    </button>
                                </div>
                            ))}
                            <button
                                className="admin-blog-btn"
                                onClick={() => addListItem(b.id)}
                            >
                                + Liste öğesi ekle
                            </button>
                        </>
                    )}
                </div>
            ))}

            <div className="admin-blog-add-row">
                <button
                    className="admin-blog-btn"
                    onClick={() => addBlock("heading")}
                >
                    + Başlık
                </button>
                <button
                    className="admin-blog-btn"
                    onClick={() => addBlock("paragraph")}
                >
                    + Paragraf
                </button>
                <button
                    className="admin-blog-btn"
                    onClick={() => addBlock("quote")}
                >
                    + Alıntı
                </button>
                <button
                    className="admin-blog-btn"
                    onClick={() => addBlock("list")}
                >
                    + Liste
                </button>
                <button
                    className="admin-blog-btn"
                    onClick={() => addBlock("image")}
                >
                    + Görsel (URL)
                </button>
            </div>
        </div>
    );
}
