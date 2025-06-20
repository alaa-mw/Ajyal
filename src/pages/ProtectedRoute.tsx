import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  // const { userToken, userRole } = useSelector((state: RootState) => state.auth);
  const userToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  const location = useLocation();

  // تحقق من وجود توكن
  if (!userToken) {
    console.log("no token");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // تحقق من الصلاحيات إذا كانت محددة
  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    return <Navigate to="/not-authorized" replace />;
  }

  // token exist & role allowed
  return <Outlet />; //
};

export default ProtectedRoute;
