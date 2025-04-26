
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, currentUser } = useAppContext();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If roles are specified, check if the user has one of those roles
  if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role)) {
    // Redirect to unauthorized page if authenticated but not authorized
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
