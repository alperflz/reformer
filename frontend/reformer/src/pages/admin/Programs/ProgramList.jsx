import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";

export default function ProgramsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const fetchPrograms = async () => {
    try {
      const res = await axios.get("/programs");
      setItems(res.data.programs);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Programı silmek istediğine emin misin?")) return;

    await axios.delete(`/programs/${id}`);
    fetchPrograms();
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="admin-programs-page">
      <div className="admin-header">
        <h1>Programlar</h1>
        <Link className="admin-btn-primary" to="/admin/programs/new">
          + Yeni Program
        </Link>
      </div>

      <input
        className="admin-input"
        placeholder="Program ara..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <table className="admin-table">
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Slug</th>
            <th>Aktif</th>
            <th>Kurslar</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((i) => i.title.toLowerCase().includes(q.toLowerCase()))
            .map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.slug}</td>
                <td>{p.isPublished ? "✔" : "✖"}</td>
                <td>
                  <Link to={`/admin/programs/${p._id}/courses`}>
                    Kursları Yönet
                  </Link>
                </td>
                <td style={{display: "flex", gap: "10px"}}>
                  <Link
                    className="admin-btn-small"
                    to={`/admin/programs/${p._id}/edit`}
                  >
                    Düzenle
                  </Link>

                  <button
                    className="admin-btn-small admin-btn-small-danger"
                    onClick={() => remove(p._id)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
