import { BarChart3, Boxes, Building2, Home, LogOut, Menu, Users, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Button from '../UI/Button';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/financeiro', label: 'Financeiro', icon: BarChart3 },
  { to: '/estoque', label: 'Estoque', icon: Boxes },
  { to: '/rh', label: 'RH', icon: Users },
  { to: '/compras', label: 'Compras', icon: Building2 },
];

export default function Sidebar({ open, onToggle, onLogout }) {
  return (
    <>
      <button className="mobile-menu-btn" type="button" onClick={onToggle} aria-label="Abrir menu">
        <Menu size={22} />
      </button>
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">ERP</div>
          <div>
            <strong>Portal Academico</strong>
            <span>Sistemas Distribuidos</span>
          </div>
          <button className="sidebar-close" type="button" onClick={onToggle} aria-label="Fechar menu">
            <X size={18} />
          </button>
        </div>

        <nav>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onToggle} className={({ isActive }) => (isActive ? 'active' : '')}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <Button variant="ghost" className="logout-btn" onClick={onLogout}>
          <LogOut size={18} />
          Sair
        </Button>
      </aside>
      {open && <button className="sidebar-backdrop" type="button" onClick={onToggle} aria-label="Fechar menu" />}
    </>
  );
}
