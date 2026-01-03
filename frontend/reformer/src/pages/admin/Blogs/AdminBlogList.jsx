import { useEffect, useMemo, useState } from "react";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import "./AdminBlog.css";

export default function BlogList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");

    useEffect(() => {
        axios.get("/blogs/admin/all").then((res) => {
            setItems(res.data || []);
            setLoading(false);
        });
    }, []);

    const filtered = useMemo(() => {
        const s = q.toLowerCase().trim();
        if (!s) return items;
        return items.filter((b) =>
            [b.title, b.category, b.slug]
                .filter(Boolean)
                .some((x) => x.toLowerCase().includes(s))
        );
    }, [items, q]);

    return (
        <div className="admin-blog-page">
            {/* HEADER */}
            <div className="admin-blog-header">
                <div>
                    <h1 className="admin-blog-title">Blog Yazıları</h1>
                    <p className="admin-blog-subtitle">
                        Yayınlanan ve taslak blog içeriklerini yönetin.
                    </p>
                </div>

                <div className="admin-blog-toolbar">
                    <input
                        className="admin-blog-input"
                        placeholder="Başlık, kategori veya slug ara…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    <Link
                        to="/admin/blogs/new"
                        className="admin-blog-btn admin-blog-btn-primary"
                    >
                        + Yeni Blog
                    </Link>
                </div>
            </div>

            {/* TABLE CARD */}
            <div className="admin-blog-card admin-blog-list-card">
                {loading ? (
                    <div className="admin-blog-loading">Yükleniyor…</div>
                ) : filtered.length ? (
                    <table className="admin-blog-table">
                        <thead>
                            <tr>
                                <th>Blog</th>
                                <th>Kategori</th>
                                <th>Durum</th>
                                <th>Views</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((b) => (
                                <tr key={b._id}>
                                    <td>
                                        <div className="admin-blog-title-cell">
                                            <strong>{b.title}</strong>
                                            <span className="admin-blog-slug">
                                                /{b.slug}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        {b.category ? (
                                            <span className="admin-blog-category">
                                                {b.category}
                                            </span>
                                        ) : (
                                            <span className="admin-blog-muted">—</span>
                                        )}
                                    </td>

                                    <td>
                                        {b.isPublished ? (
                                            <span className="admin-blog-badge admin-blog-badge-green">
                                                Yayında
                                            </span>
                                        ) : (
                                            <span className="admin-blog-badge admin-blog-badge-gray">
                                                Taslak
                                            </span>
                                        )}
                                    </td>

                                    <td>{b.views ?? 0}</td>

                                    <td>
                                        <div className="admin-blog-actions">
                                            <Link
                                                to={`/admin/blogs/${b._id}/edit`}
                                                className="admin-blog-btn"
                                            >
                                                Düzenle
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-blog-empty">
                        <strong>Sonuç bulunamadı</strong>
                        <span>
                            Arama kriterlerini değiştir veya yeni bir blog oluştur.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
