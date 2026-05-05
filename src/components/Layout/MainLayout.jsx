import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { clearSession, getUser } from '../../store/authStore';
import Header from './Header';
import Sidebar from './Sidebar';

const titles = {
  '/dashboard': 'Dashboard',
  '/financeiro': 'Financeiro',
  '/estoque': 'Estoque',
  '/rh': 'Recursos Humanos',
  '/compras': 'Compras',
};

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((value) => !value)} onLogout={handleLogout} />
      <main className="main-area">
        <Header title={titles[location.pathname] || 'Portal'} user={getUser()} />
        <Outlet />
      </main>
    </div>
  );
}
