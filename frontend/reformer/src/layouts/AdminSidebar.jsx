// src/admin/components/AdminSidebar.jsx
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="logo">
        <img src="/images/logo-dark.png" alt="" />
      </div>

      <nav>
        <NavLink to="/admin" end>
          <i className="bi bi-speedometer2"></i> Dashboard
        </NavLink>

        <NavLink to="/admin/programs">
          <i className="bi bi-journal-text"></i> Eğitim Programları
        </NavLink>

        <NavLink to="/admin/enrollments">
          <i className="bi bi-people"></i> Ön Kayıtlar
        </NavLink>

        <NavLink to="/admin/settings">
          <i className="bi bi-gear"></i> Ayarlar
        </NavLink>
      </nav>
    </aside>
  );
}
