import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
