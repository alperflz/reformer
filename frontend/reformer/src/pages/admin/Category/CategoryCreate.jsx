import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

// --- SLUGIFY FUNCTION ---
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function CategoryCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    desc: "",
    icon: "",
    order: 0,
    isActive: true,
  });

  const [saving, setSaving] = useState(false);
  const [manualSlug, setManualSlug] = useState(false); // kullanıcı slug'a dokundu mu?

  const onNameChange = (val) => {
    setForm((prev) => ({
      ...prev,
      name: val,
      slug: manualSlug ? prev.slug : slugify(val), // otomatik slug üret
    }));
  };

  const onSlugChange = (val) => {
    setManualSlug(true); // kullanıcı artık manuel düzenliyor
    setForm((prev) => ({ ...prev, slug: slugify(val) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.slug) {
      return alert("Kategori adı ve slug alanı zorunludur.");
    }

    try {
      setSaving(true);
      await axios.post("/categories", form);

      alert("Kategori başarıyla oluşturuldu!");
      navigate("/admin/categories");
    } catch (err) {
      console.log(err);
      alert("Kategori oluşturulamadı!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h1 className="admin-title">Yeni Kategori Oluştur</h1>

      <label>Kategori Adı</label>
      <input
        type="text"
        value={form.name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <label>Slug (otomatik oluşur, istersen düzenleyebilirsin)</label>
      <input
        type="text"
        value={form.slug}
        onChange={(e) => onSlugChange(e.target.value)}
      />

      <label>Açıklama</label>
      <textarea
        value={form.desc}
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />

      <label>İkon</label>
      <input
        type="text"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      />

      <label>Sıra</label>
      <input
        type="number"
        value={form.order}
        onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
      />

      <label>Aktif Mi?</label>
      <select
        value={form.isActive}
        onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
      >
        <option value="true">Evet</option>
        <option value="false">Hayır</option>
      </select>

      <button className="btn-primary" type="submit" disabled={saving}>
        {saving ? "Oluşturuluyor..." : "Oluştur"}
      </button>
    </form>
  );
}
