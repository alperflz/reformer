import { useState } from "react";
import axios from "axios";

export default function CategoryCreate() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    desc: "",
    icon: "",
    order: 0,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/categories", form);
    alert("Kategori oluşturuldu!");
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Kategori Oluştur</h2>

      <input
        type="text"
        placeholder="Kategori adı"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="text"
        placeholder="slug"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <textarea
        placeholder="Açıklama"
        value={form.desc}
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />

      <input
        type="text"
        placeholder="İkon"
        value={form.icon}
        onChange={(e) => setForm({ ...form, icon: e.target.value })}
      />

      <input
        type="number"
        placeholder="Sıra"
        value={form.order}
        onChange={(e) => setForm({ ...form, order: e.target.value })}
      />

      <button type="submit">Oluştur</button>
    </form>
  );
}
