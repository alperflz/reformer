import { Outlet, NavLink } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";
import "./AdminLayout.css";
import "./Admin.css";
import "./Programs.css"

export default function AdminLayout() {
  return (
    <div className="admin-wrapper">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <a href="/" className="admin-logo">
          <img src="/images/logo-dark.png" alt="" />
        </a>

        <nav className="admin-nav">
          <NavLink to="/admin" end>
            <i className="bi bi-speedometer2" /> Dashboard
          </NavLink>
          <NavLink to="/admin/categories">
            <i className="bi bi-people" /> Eğitim Kategorileri
          </NavLink>
          <NavLink to="/admin/programs">
            <i className="bi bi-book" /> Programlar
          </NavLink>
          <NavLink to="/admin/enrollments">
            <i className="bi bi-people" /> Kayıtlar
          </NavLink>
          <NavLink to="/admin/blogs">
            <i className="bi bi-people" /> Blog Yazıları
          </NavLink>
        </nav>
      </aside>

      <main className="admin-main">
        <AdminTopbar />
        <div className="admin-content">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
