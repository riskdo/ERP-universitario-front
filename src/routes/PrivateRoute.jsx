import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../store/authStore';

export default function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
