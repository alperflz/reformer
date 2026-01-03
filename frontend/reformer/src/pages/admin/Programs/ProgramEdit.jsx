import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../../api/axios";

export default function ProgramEdit() {
    const { id } = useParams();
    const [program, setProgram] = useState(null);
    const [categories, setCategories] = useState([]);

    const [coverFile, setCoverFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [pRes, cRes] = await Promise.all([
                axios.get(`/programs/${id}`),
                axios.get("/categories"),
            ]);

            setProgram(pRes.data.program);
            setCategories(cRes.data || []);
        } catch (err) {
            console.error(err);
            alert("Program bilgileri alınamadı");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const update = (field, value) =>
        setProgram((prev) => ({ ...prev, [field]: value }));

    const updateArray = (field, newArr) =>
        setProgram((prev) => ({ ...prev, [field]: newArr }));

    const save = async () => {
        if (!program.title) return alert("Başlık zorunludur");

        try {
            setSaving(true);
            await axios.put(`/programs/${program._id}`, {
                title: program.title,
                desc: program.desc,
                overview: program.overview,
                category: program.category?._id || program.category,
                level: program.level,
                price: program.price,
                badgeText: program.badgeText,
                outcomes: program.outcomes,
                curriculum: program.curriculum,
                whoCanJoin: program.whoCanJoin,
                faq: program.faq,
                isPublished: program.isPublished,
            });

            alert("Program güncellendi");
        } catch (err) {
            console.error(err);
            alert("Program güncellenemedi");
        } finally {
            setSaving(false);
        }
    };

    const uploadCover = async () => {
        if (!coverFile) return alert("Kapak dosyası seçiniz.");

        const fd = new FormData();
        fd.append("cover", coverFile);

        try {
            const res = await axios.put(`/programs/${program._id}/cover`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            update("coverImage", res.data.coverImage);
            alert("Kapak yüklendi");
        } catch (err) {
            console.error(err);
            alert("Kapak yüklenemedi");
        }
    };

    const uploadGallery = async () => {
        if (!galleryFiles.length) return alert("Galeri dosyası seçiniz.");

        const fd = new FormData();
        galleryFiles.forEach((f) => fd.append("gallery", f));

        try {
            const res = await axios.post(
                `/programs/${program._id}/gallery`,
                fd,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            update("gallery", res.data.gallery);
            alert("Galeri güncellendi");
        } catch (err) {
            console.error(err);
            alert("Galeri yüklenemedi");
        }
    };

    if (loading) return <div className="admin-programs-loading">Yükleniyor...</div>;
    if (!program) return <div>Program bulunamadı</div>;

    return (
        <div className="admin-programs-form">
            <div className="admin-programs-header">
                <h1>Program Düzenle</h1>
                <Link
                    to={`/admin/programs/${program._id}/courses`}
                    className="admin-programs-btn-secondary"
                >
                    Kurs Tarihlerini Yönet
                </Link>
            </div>

            {/* TEMEL BİLGİLER */}
            <label>Başlık</label>
            <input
                className="admin-programs-input"
                value={program.title}
                onChange={(e) => update("title", e.target.value)}
            />

            <label>Kısa Açıklama</label>
            <input
                className="admin-programs-input"
                value={program.desc || ""}
                onChange={(e) => update("desc", e.target.value)}
            />

            <label>Detaylı Açıklama</label>
            <textarea
                className="admin-programs-input"
                value={program.overview || ""}
                onChange={(e) => update("overview", e.target.value)}
            />

            <label>Kategori</label>
            <select
                className="admin-programs-input"
                value={program.category?._id || program.category || ""}
                onChange={(e) => update("category", e.target.value)}
            >
                <option value="">Seçiniz</option>
                {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <label>Seviye</label>
            <input
                className="admin-programs-input"
                value={program.level || ""}
                onChange={(e) => update("level", e.target.value)}
            />

            <label>Varsayılan Fiyat</label>
            <input
                className="admin-programs-input"
                type="number"
                value={program.price || 0}
                onChange={(e) => update("price", Number(e.target.value))}
            />

            <label>Badge Text</label>
            <input
                className="admin-programs-input"
                value={program.badgeText || ""}
                onChange={(e) => update("badgeText", e.target.value)}
            />

            <label>Yayın Durumu</label>
            <select
                className="admin-programs-input"
                value={program.isPublished ? "true" : "false"}
                onChange={(e) => update("isPublished", e.target.value === "true")}
            >
                <option value="true">Yayında</option>
                <option value="false">Taslak</option>
            </select>

            {/* KAPAK */}
            <h3>Kapak Görseli</h3>
            {program.coverImage && (
                <img
                    src={program.coverImage}
                    alt="cover"
                    className="admin-programs-cover-preview"
                />
            )}

            <input
                type="file"
                onChange={(e) => setCoverFile(e.target.files[0])}
            />
            <button
                type="button"
                className="admin-programs-btn-secondary"
                onClick={uploadCover}
            >
                Kapak Yükle
            </button>

            {/* GALERİ */}
            <h3>Galeri Görselleri</h3>
            <input
                type="file"
                multiple
                onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
            />
            <button
                type="button"
                className="admin-programs-btn-secondary"
                onClick={uploadGallery}
            >
                Galeriye Ekle
            </button>

            <ul className="admin-programs-gallery-list">
                {program.gallery?.map((g, idx) => (
                    <li key={idx}>{g.src}</li>
                ))}
            </ul>

            {/* OUTCOMES */}
            <h3>Program Çıktıları</h3>
            <ArrayEditor
                items={program.outcomes || []}
                onChange={(arr) => updateArray("outcomes", arr)}
                placeholder="Yeni çıktı ekle..."
            />

            {/* KİMLER KATILABİLİR */}
            <h3>Kimler Katılabilir?</h3>
            <ArrayEditor
                items={program.whoCanJoin || []}
                onChange={(arr) => updateArray("whoCanJoin", arr)}
                placeholder="Yeni madde ekle..."
            />

            {/* CURRICULUM */}
            <h3>Müfredat</h3>
            <CurriculumEditor
                items={program.curriculum || []}
                onChange={(arr) => updateArray("curriculum", arr)}
            />

            {/* FAQ */}
            <h3>Sık Sorulan Sorular</h3>
            <FaqEditor
                items={program.faq || []}
                onChange={(arr) => updateArray("faq", arr)}
            />

            <button
                className="admin-programs-btn-primary"
                onClick={save}
                disabled={saving}
            >
                {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
        </div>
    );
}

/* ---------- Basit yardımcı editörler ---------- */

function ArrayEditor({ items, onChange, placeholder }) {
    const [value, setValue] = useState("");

    const add = () => {
        if (!value.trim()) return;
        onChange([...(items || []), value.trim()]);
        setValue("");
    };

    const remove = (idx) => {
        const copy = [...items];
        copy.splice(idx, 1);
        onChange(copy);
    };

    return (
        <div className="admin-programs-array-editor">
            <div className="admin-programs-array-input-row">
                <input
                    className="admin-programs-input"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    type="button"
                    className="admin-programs-btn-secondary"
                    onClick={add}
                >
                    Ekle
                </button>
            </div>
            <ul>
                {items?.map((item, idx) => (
                    <li key={idx}>
                        {item}
                        <button
                            type="button"
                            className="admin-programs-btn-small admin-programs-btn-danger"
                            onClick={() => remove(idx)}
                        >
                            Sil
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CurriculumEditor({ items, onChange }) {
    const [item, setItem] = useState({ title: "", desc: "" });

    const add = () => {
        if (!item.title.trim()) return;
        onChange([...(items || []), { ...item }]);
        setItem({ title: "", desc: "" });
    };

    const remove = (idx) => {
        const copy = [...items];
        copy.splice(idx, 1);
        onChange(copy);
    };

    return (
        <div className="admin-programs-curriculum-editor">
            <input
                className="admin-programs-input"
                placeholder="Başlık"
                value={item.title}
                onChange={(e) => setItem((s) => ({ ...s, title: e.target.value }))}
            />
            <textarea
                className="admin-programs-input"
                placeholder="Açıklama"
                value={item.desc}
                onChange={(e) => setItem((s) => ({ ...s, desc: e.target.value }))}
            />
            <button
                type="button"
                className="admin-programs-btn-secondary"
                onClick={add}
            >
                Ekle
            </button>

            <ul>
                {items?.map((c, idx) => (
                    <li key={idx}>
                        <strong>{c.title}</strong> — {c.desc}
                        <button
                            type="button"
                            className="admin-programs-btn-small admin-programs-btn-danger"
                            onClick={() => remove(idx)}
                        >
                            Sil
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function FaqEditor({ items, onChange }) {
    const [item, setItem] = useState({ q: "", a: "" });

    const add = () => {
        if (!item.q.trim() || !item.a.trim()) return;
        onChange([...(items || []), { ...item }]);
        setItem({ q: "", a: "" });
    };

    const remove = (idx) => {
        const copy = [...items];
        copy.splice(idx, 1);
        onChange(copy);
    };

    return (
        <div className="admin-programs-faq-editor">
            <input
                className="admin-programs-input"
                placeholder="Soru"
                value={item.q}
                onChange={(e) => setItem((s) => ({ ...s, q: e.target.value }))}
            />
            <textarea
                className="admin-programs-input"
                placeholder="Cevap"
                value={item.a}
                onChange={(e) => setItem((s) => ({ ...s, a: e.target.value }))}
            />
            <button
                type="button"
                className="admin-programs-btn-secondary"
                onClick={add}
            >
                Ekle
            </button>

            <ul>
                {items?.map((faq, idx) => (
                    <li key={idx}>
                        <strong>{faq.q}</strong>
                        <p>{faq.a}</p>
                        <button
                            type="button"
                            className="admin-programs-btn-small admin-programs-btn-danger"
                            onClick={() => remove(idx)}
                        >
                            Sil
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
