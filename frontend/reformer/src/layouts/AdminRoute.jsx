import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuth || !user) return <Navigate to="/auth" replace />;

  if (!user.roles?.includes("admin")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
