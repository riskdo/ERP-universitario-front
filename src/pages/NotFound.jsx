import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="panel">
        <span className="error-code">404</span>
        <h1>Recurso nao encontrado</h1>
        <p>A rota solicitada nao existe no Portal ERP.</p>
        <Link to="/dashboard">
          <Button>Voltar ao dashboard</Button>
        </Link>
      </div>
    </main>
  );
}
