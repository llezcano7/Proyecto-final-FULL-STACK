import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; 

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
