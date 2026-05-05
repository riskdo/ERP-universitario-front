import ThemeToggle from '../UI/ThemeToggle';

export default function Header({ title, user }) {
  return (
    <header className="topbar">
      <div>
        <p>Portal ERP Web</p>
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions">
        <ThemeToggle />
        <div className="user-chip">
          <span>{user?.nome?.charAt(0) || 'U'}</span>
          <div>
            <strong>{user?.nome || 'Usuario'}</strong>
            <small>{user?.perfil || 'Funcionario'}</small>
          </div>
        </div>
      </div>
    </header>
  );
}
