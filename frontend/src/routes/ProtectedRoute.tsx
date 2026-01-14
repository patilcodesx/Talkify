import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = true; // later replace with auth context / JWT

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
