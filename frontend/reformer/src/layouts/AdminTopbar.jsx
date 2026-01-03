import { useAuth } from "../context/AuthContext";

export default function AdminTopbar() {
  const { user, logout } = useAuth();

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-title">Yönetim Paneli</div>

      <div className="admin-topbar-user">
        <span>{user?.name}</span>
        <button onClick={logout}>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </header>
  );
}
