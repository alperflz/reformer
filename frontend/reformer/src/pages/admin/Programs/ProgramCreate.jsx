import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function ProgramCreate() {
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    overview: "",
    category: "",
    level: "Seviye 1",
    price: 0,
    badgeText: "",
    isPublished: true,
  });

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const save = async () => {
    if (!form.title) {
      return alert("Başlık zorunludur.");
    }

    try {
      setSaving(true);
      const res = await axios.post("/programs", form);
      alert("Program oluşturuldu!");
      window.location.href = `/admin/programs/${res.data.program._id}/edit`;
    } catch (err) {
      console.error(err);
      alert("Program oluşturulamadı");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-programs-form">
      <h1>Yeni Program Oluştur</h1>

      <label>Başlık</label>
      <input
        className="admin-programs-input"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <label>Kısa Açıklama</label>
      <input
        className="admin-programs-input"
        value={form.desc}
        onChange={(e) => update("desc", e.target.value)}
      />

      <label>Detaylı Açıklama (overview)</label>
      <textarea
        className="admin-programs-input"
        value={form.overview}
        onChange={(e) => update("overview", e.target.value)}
      />

      <label>Kategori</label>
      <select
        className="admin-programs-input"
        value={form.category}
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
        value={form.level}
        onChange={(e) => update("level", e.target.value)}
      />

      <label>Varsayılan Fiyat</label>
      <input
        className="admin-programs-input"
        type="number"
        value={form.price}
        onChange={(e) => update("price", Number(e.target.value))}
      />

      <label>Badge Text (isteğe bağlı)</label>
      <input
        className="admin-programs-input"
        value={form.badgeText}
        onChange={(e) => update("badgeText", e.target.value)}
      />

      <label>Yayın Durumu</label>
      <select
        className="admin-programs-input"
        value={form.isPublished ? "true" : "false"}
        onChange={(e) => update("isPublished", e.target.value === "true")}
      >
        <option value="true">Yayında</option>
        <option value="false">Taslak</option>
      </select>

      <button
        className="admin-programs-btn-primary"
        onClick={save}
        disabled={saving}
      >
        {saving ? "Kaydediliyor..." : "Oluştur"}
      </button>
    </div>
  );
}
