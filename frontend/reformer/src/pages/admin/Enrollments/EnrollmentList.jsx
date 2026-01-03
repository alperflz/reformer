import { useEffect, useState, useMemo } from "react";
import axios from "../../../api/axios";
import * as XLSX from "xlsx";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import "./EnrollmentList.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminEnrollments() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get("/enrollments");
      setItems(res.data.enrollments || []);
    } catch {
      alert("Kayıtlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/enrollments/${id}/status`, { status });
      setItems((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      );

      if (selectedItem?._id === id) {
        setSelectedItem((prev) => ({ ...prev, status }));
      }
    } catch {
      alert("Durum güncellenemedi");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`/enrollments/${id}`);
      setItems((prev) => prev.filter((e) => e._id !== id));

      if (selectedItem?._id === id) {
        setDrawerOpen(false);
        setSelectedItem(null);
      }
    } catch {
      alert("Silinemedi");
    }
  };

  // EXCEL EXPORT
  const exportExcel = () => {
    const data = filtered.map((e) => ({
      AdSoyad: e.name,
      Email: e.email,
      Telefon: e.phone,
      Program: e.program?.title,
      Tarih: e.course?.startDate?.slice(0, 10),
      Saat: e.course?.time,
      Durum: statusLabel(e.status),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "OnKayitlar");
    XLSX.writeFile(wb, "on_kayitlar.xlsx");
  };

  // FILTERS
  const filtered = useMemo(() => {
    return items
      .filter((e) =>
        search
          ? e.phone?.replace(/\D/g, "").includes(search.replace(/\D/g, ""))
          : true
      )
      .filter((e) => (filter === "all" ? true : e.status === filter))
      .filter((e) =>
        programFilter === "all" ? true : e.program?.title === programFilter
      );
  }, [items, search, filter, programFilter]);

  const programList = [...new Set(items.map((e) => e.program?.title))];

  // DASHBOARD STATS
  const statApproved = items.filter((e) => e.status === "approved").length;
  const statPending = items.filter((e) => e.status === "pending").length;
  const statRejected = items.filter((e) => e.status === "rejected").length;

  const pieData = {
    labels: ["Onaylı", "Beklemede", "Reddedilmiş"],
    datasets: [
      {
        data: [statApproved, statPending, statRejected],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  if (loading) return <div className="admin-loading">Yükleniyor...</div>;

  return (
    <div className="admin-page">

      {/* DASHBOARD */}
      <div className="admin-dashboard">
        <div className="admin-stat-card">
          <span className="admin-stat-title">Toplam Başvuru</span>
          <strong className="admin-stat-number">{items.length}</strong>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-title">Onaylı</span>
          <strong className="admin-stat-number green">{statApproved}</strong>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-title">Beklemede</span>
          <strong className="admin-stat-number yellow">{statPending}</strong>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-title">Reddedilmiş</span>
          <strong className="admin-stat-number red">{statRejected}</strong>
        </div>

        <div className="admin-chart-box">
          <Pie data={pieData} />
        </div>
      </div>

      {/* FILTER AREA */}
      <div className="admin-header">
        <h1>Ön Kayıt Yönetimi</h1>

        <div className="admin-header-actions">
          <input
            className="enrollment-admin-input"
            placeholder="Telefon ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="enrollment-admin-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Durum (Tümü)</option>
            <option value="pending">Beklemede</option>
            <option value="approved">Onaylı</option>
            <option value="rejected">Reddedilmiş</option>
          </select>

          <select
            className="enrollment-admin-select"
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
          >
            <option value="all">Program (Tümü)</option>
            {programList.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <button className="admin-export-btn" onClick={exportExcel}>
            ⬇ Excel
          </button>

        </div>
      </div>

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>İletişim</th>
            <th>Program</th>
            <th>Tarih</th>
            <th>Durum</th>
            <th style={{ textAlign: "right" }}>İşlem</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((e) => (
            <tr
              key={e._id}
              className="admin-row"
              onClick={() => {
                setSelectedItem(e);
                setDrawerOpen(true);
              }}
            >
              <td className="admin-name-cell">
                <strong>{e.name}</strong>
                <span className="admin-email">{e.email}</span>
              </td>

              <td>
                <span className="admin-phone">{e.phone}</span>
              </td>

              <td>{e.program?.title}</td>

              <td>
                {e.course?.startDate?.slice(0, 10)} <br />
                <small>{e.course?.time}</small>
              </td>

              <td>
                <span className={`admin-badge admin-${e.status}`}>
                  {statusLabel(e.status)}
                </span>
              </td>

              <td className="admin-actions">
                <button
                  className="admin-btn admin-approve"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    updateStatus(e._id, "approved");
                  }}
                >
                  ✔
                </button>
                <button
                  className="admin-btn admin-reject"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    updateStatus(e._id, "rejected");
                  }}
                >
                  ✖
                </button>
                <button
                  className="admin-btn admin-delete"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    remove(e._id);
                  }}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DRAWER */}
      {drawerOpen && selectedItem && (
        <>
          <div className="admin-drawer-backdrop"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="admin-drawer">
            <h2>{selectedItem.name}</h2>

            <div className="admin-d-info">
              <p><b>Email:</b> {selectedItem.email}</p>
              <p><b>Telefon:</b> {selectedItem.phone}</p>
              <p><b>Program:</b> {selectedItem.program?.title}</p>
              <p><b>Başlangıç:</b> {selectedItem.course?.startDate}</p>
              <p><b>Saat:</b> {selectedItem.course?.time}</p>
              <p><b>Not:</b> {selectedItem.note || "—"}</p>
            </div>

            <div className="admin-d-actions">

              <button
                className="admin-btn admin-approve"
                onClick={() => updateStatus(selectedItem._id, "approved")}
              >
                Onayla
              </button>

              <button
                className="admin-btn admin-reject"
                onClick={() => updateStatus(selectedItem._id, "rejected")}
              >
                Reddet
              </button>

              <button
                className="admin-btn admin-delete"
                onClick={() => remove(selectedItem._id)}
              >
                Sil
              </button>

              <button
                className="admin-btn admin-close"
                onClick={() => setDrawerOpen(false)}
              >
                Kapat
              </button>

            </div>
          </div>
        </>
      )}

    </div>
  );
}

function statusLabel(status) {
  return status === "approved"
    ? "Onaylandı"
    : status === "rejected"
      ? "Reddedildi"
      : "Beklemede";
}
