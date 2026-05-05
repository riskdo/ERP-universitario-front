import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import ThemeToggle from '../components/UI/ThemeToggle';
import { saveSession } from '../store/authStore';

export default function Login() {
  const [form, setForm] = useState({ email: 'funcionario@erp.local', senha: '123456' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const session = await authService.login(form.email, form.senha);
      saveSession(session);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Nao foi possivel entrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-panel">
        <div className="login-copy">
          <div className="login-brand">ERP</div>
          <h1>Portal Academico de Sistemas Distribuidos</h1>
          <p>Entrada unica para os modulos Financeiro, RH, Estoque e Compras.</p>
        </div>
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card-header">
            <div>
              <LockKeyhole size={28} />
              <h2>Login de funcionario</h2>
            </div>
            <ThemeToggle />
          </div>
          <Input label="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <Input label="Senha" type="password" value={form.senha} onChange={(event) => setForm({ ...form, senha: event.target.value })} required />
          {error && <div className="error-box">{error}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <small>Use qualquer email e senha validos enquanto os backends nao estiverem prontos.</small>
        </form>
      </div>
    </main>
  );
}
