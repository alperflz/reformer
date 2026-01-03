import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import BlogBlocksEditor from "./BlogEditor";
import BlogPreview from "./BlogPreview";
import { blocksToHtml } from "./BlogHtml";
import "./AdminBlog.css";
import BlogCoverUpload from "./BlogCoverUpload";
import { htmlToBlocks } from "./htmlToBlocks";


export default function BlogEdit() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [author, setAuthor] = useState("Re:Form Akademi");
    const [isPublished, setIsPublished] = useState(true);
    const [rawHtml, setRawHtml] = useState("");
    const [coverFile, setCoverFile] = useState(null);
    const [existingCover, setExistingCover] = useState("");

    const coverPreview = useMemo(() => {
        if (coverFile) return URL.createObjectURL(coverFile);
        if (existingCover)
            return `${import.meta.env.VITE_BASE_URL}${existingCover}`;
        return "";
    }, [coverFile, existingCover]);

    const [blocks, setBlocks] = useState([
        { id: Date.now(), type: "paragraph", value: "" },
    ]);

    useEffect(() => {
        axios.get(`/blogs/admin/${id}`).then((res) => {
            const b = res.data;

            setTitle(b.title || "");
            setExcerpt(b.excerpt || "");
            setCategory(b.category || "");
            setAuthor(b.author || "Re:Form Akademi");
            setIsPublished(Boolean(b.isPublished));
            setExistingCover(b.image || "");
            setTags(Array.isArray(b.tags) ? b.tags.join(", ") : "");

            setRawHtml(b.content || "");

            setBlocks([{ id: Date.now(), type: "paragraph", value: "" }]);
            setEditMode(false);

            setLoading(false);
        });
    }, [id]);

    const save = async () => {
        const html = editMode
            ? blocksToHtml(blocks)
            : rawHtml;

        if (!html || !html.trim()) {
            return alert("İçerik boş.");
        }

        try {
            setSaving(true);
            const fd = new FormData();
            fd.append("title", title);
            fd.append("excerpt", excerpt);
            fd.append("category", category);
            fd.append("author", author);
            fd.append("isPublished", String(isPublished));
            fd.append("content", html);

            const tagList = tags
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean);
            tagList.forEach((t) => fd.append("tags[]", t));

            if (coverFile) fd.append("image", coverFile);

            await axios.put(`/blogs/${id}`, fd);
            alert("Güncellendi");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="admin-blog-page">Yükleniyor…</div>;

    return (
        <div className="admin-blog-page">
            <div className="admin-blog-header">
                <div>
                    <h1 className="admin-blog-title">Blog Düzenle</h1>
                    <p className="admin-blog-subtitle">
                        Sol tarafta düzenle, sağda canlı önizleme.
                    </p>
                </div>

                <div className="admin-blog-toolbar">
                    <button
                        className="admin-blog-btn"
                        onClick={() => (window.location.href = "/admin/blogs")}
                    >
                        ← Listeye dön
                    </button>
                    <button
                        className="admin-blog-btn admin-blog-btn-primary"
                        onClick={save}
                        disabled={saving}
                    >
                        {saving ? "Kaydediliyor…" : "Kaydet"}
                    </button>
                </div>
            </div>

            <div className="admin-blog-card admin-blog-form">
                <div className="admin-blog-grid-two">
                    <div className="admin-blog-field">
                        <div className="admin-blog-label">Başlık</div>
                        <input
                            className="admin-blog-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="admin-blog-field">
                        <div className="admin-blog-label">Yayın Durumu</div>
                        <select
                            className="admin-blog-select"
                            value={isPublished ? "true" : "false"}
                            onChange={(e) => setIsPublished(e.target.value === "true")}
                        >
                            <option value="true">Yayında</option>
                            <option value="false">Taslak</option>
                        </select>
                    </div>

                    <div className="admin-blog-field">
                        <div className="admin-blog-label">Kısa Özet</div>
                        <textarea
                            className="admin-blog-input"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                        />
                    </div>

                    <div className="admin-blog-field">
                        <div className="admin-blog-label">Kapak Görseli</div>

                        <BlogCoverUpload
                            value={coverPreview}
                            onChangeFile={setCoverFile}
                        />

                        <div className="admin-blog-help">
                            Önerilen oran: 16:9 · 1600×900
                        </div>
                    </div>

                    <div className="admin-blog-field">
                        <div className="admin-blog-label">Kategori</div>
                        <input
                            className="admin-blog-input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="admin-blog-field">
                        <div className="admin-blog-label">Etiketler</div>
                        <input
                            className="admin-blog-input"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className="admin-blog-field">
                        <div className="admin-blog-label">Yazar</div>
                        <input
                            className="admin-blog-input"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                </div>

                <div className="admin-blog-split">
                    {!editMode && rawHtml && (
                        <div className="admin-blog-empty">
                            <strong>Bu yazı eski formatta</strong>
                            <span>
                                Düzenlemek için yeni içerik oluşturarak devam etmelisin.
                            </span>

                            <button
                                className="admin-blog-btn admin-blog-btn-primary"
                                onClick={() => {
                                    setBlocks(htmlToBlocks(rawHtml));
                                    setRawHtml("");
                                    setEditMode(true);
                                }}
                            >
                                Bu yazıyı baştan düzenle
                            </button>
                        </div>
                    )}
                    {editMode && (
                        <BlogBlocksEditor blocks={blocks} setBlocks={setBlocks} />
                    )}
                    <BlogPreview
                        title={title}
                        author={author}
                        category={category}
                        blocks={blocks}
                        coverUrl={coverPreview}
                        rawHtml={rawHtml}
                    />
                </div>
            </div>
        </div>
    );
}
