// src/admin/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <div>Yükleniyor...</div>;

  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <h3>Toplam Program</h3>
        <p>{stats.totalPrograms}</p>
      </div>

      <div className="stat-card">
        <h3>Yaklaşan Eğitimler</h3>
        <p>{stats.upcomingCount}</p>
      </div>

      <div className="stat-card">
        <h3>Ön Kayıtlar</h3>
        <p>{stats.enrollments}</p>
      </div>
    </div>
  );
}
