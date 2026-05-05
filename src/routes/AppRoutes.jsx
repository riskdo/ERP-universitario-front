import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import Compras from '../pages/Compras';
import Dashboard from '../pages/Dashboard';
import Estoque from '../pages/Estoque';
import Financeiro from '../pages/Financeiro';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import RH from '../pages/RH';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/rh" element={<RH />} />
          <Route path="/compras" element={<Compras />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
