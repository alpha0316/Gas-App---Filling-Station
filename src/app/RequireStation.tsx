import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store";
import { useStationSocket } from "../features/station/useStationSocket";

function Guarded() {
  useStationSocket();
  return <Outlet />;
}

// Only a signed-in account with role `station` may enter.
export default function RequireStation() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  if (loading) return <div className="min-h-screen bg-page" aria-busy="true" />;
  if (!user || user.role !== "station") return <Navigate to="/login" replace />;
  return <Guarded />;
}
