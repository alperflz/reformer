import { useMemo, useState } from "react";
import axios from "../../../api/axios";
import BlogBlocksEditor from "./BlogEditor";
import BlogPreview from "./BlogPreview";
import { blocksToHtml } from "./BlogHtml";
import BlogCoverUpload from "./BlogCoverUpload";
import "./AdminBlog.css";

export default function BlogCreate() {
    const [saving, setSaving] = useState(false);

    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [author, setAuthor] = useState("Re:Form Akademi");
    const [isPublished, setIsPublished] = useState(true);

    const [coverFile, setCoverFile] = useState(null);
    const coverPreview = useMemo(
        () => (coverFile ? URL.createObjectURL(coverFile) : ""),
        [coverFile]
    );


    const [blocks, setBlocks] = useState([
        { id: Date.now(), type: "paragraph", value: "" },
    ]);

    const save = async () => {
        if (!title.trim()) return alert("Başlık zorunludur.");
        const html = blocksToHtml(blocks);
        if (!html.trim()) return alert("İçerik boş olamaz.");

        try {
            setSaving(true);
            const fd = new FormData();
            fd.append("title", title.trim());
            fd.append("excerpt", excerpt.trim());
            fd.append("category", category.trim());
            fd.append("author", author.trim());
            fd.append("isPublished", String(isPublished));
            fd.append("content", html);

            const tagList = tags
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean);
            tagList.forEach((t) => fd.append("tags[]", t));

            if (coverFile) fd.append("image", coverFile);

            const res = await axios.post("/blogs", fd);
            window.location.href = `/admin/blogs/${res.data._id}/edit`;
        } catch (err) {
            alert("Blog oluşturulamadı", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-blog-page">
            <div className="admin-blog-header">
                <div>
                    <h1 className="admin-blog-title">Yeni Blog</h1>
                    <p className="admin-blog-subtitle">
                        Sol tarafta yaz, sağda anında nasıl göründüğünü gör.
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
                        <div className="admin-blog-help">
                            Örn: “Pilates’te Nefes Teknikleri”
                        </div>
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
                    <BlogBlocksEditor blocks={blocks} setBlocks={setBlocks} />
                    <BlogPreview
                        title={title}
                        author={author}
                        category={category}
                        blocks={blocks}
                        coverUrl={coverPreview}
                    />
                </div>
            </div>
        </div>
    );
}
