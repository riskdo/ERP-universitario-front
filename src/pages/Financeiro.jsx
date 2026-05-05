import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { financeiroService } from '../api/financeiroService';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Table from '../components/UI/Table';
import Toast from '../components/UI/Toast';
import { formatCurrency, statusBadge } from './helpers';

const columns = [
  { key: 'descricao', label: 'Descricao' },
  { key: 'vencimento', label: 'Vencimento' },
  { key: 'valor', label: 'Valor', render: (row) => formatCurrency(row.valor) },
  { key: 'status', label: 'Status', render: (row) => statusBadge(row.status) },
];

export default function Financeiro() {
  const [contasPagar, setContasPagar] = useState([]);
  const [contasReceber, setContasReceber] = useState([]);
  const [tipo, setTipo] = useState('pagar');
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ descricao: '', vencimento: '', valor: '', status: 'pendente' });

  useEffect(() => {
    Promise.all([financeiroService.listarContasPagar(), financeiroService.listarContasReceber()]).then(([pagar, receber]) => {
      setContasPagar([...pagar]);
      setContasReceber([...receber]);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = { ...form, valor: Number(form.valor) };
    const conta = tipo === 'pagar' ? await financeiroService.criarContaPagar(payload) : await financeiroService.criarContaReceber(payload);

    if (tipo === 'pagar') setContasPagar((items) => [conta, ...items]);
    else setContasReceber((items) => [conta, ...items]);

    setForm({ descricao: '', vencimento: '', valor: '', status: 'pendente' });
    setToast('Conta registrada com sucesso.');
  }

  return (
    <section className="page-stack">
      <div className="panel">
        <div className="section-heading">
          <div>
            <h2>Nova conta</h2>
            <p>Registre contas a pagar ou receber para acompanhamento financeiro.</p>
          </div>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <Select label="Tipo" value={tipo} onChange={(event) => setTipo(event.target.value)}>
            <option value="pagar">Conta a pagar</option>
            <option value="receber">Conta a receber</option>
          </Select>
          <Input label="Descricao" value={form.descricao} onChange={(event) => setForm({ ...form, descricao: event.target.value })} required />
          <Input label="Vencimento" type="date" value={form.vencimento} onChange={(event) => setForm({ ...form, vencimento: event.target.value })} required />
          <Input label="Valor" type="number" min="0" step="0.01" value={form.valor} onChange={(event) => setForm({ ...form, valor: event.target.value })} required />
          <Select label="Status" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
            <option value="pendente">Pendente</option>
            <option value="vencida">Vencida</option>
            <option value="liquidada">Liquidada</option>
          </Select>
          <Button type="submit">
            <Plus size={17} />
            Criar conta
          </Button>
        </form>
      </div>

      <div className="two-columns">
        <article className="panel">
          <h2>Contas a pagar</h2>
          <Table columns={columns} data={contasPagar} />
        </article>
        <article className="panel">
          <h2>Contas a receber</h2>
          <Table columns={columns} data={contasReceber} />
        </article>
      </div>
      <Toast message={toast} onClose={() => setToast('')} />
    </section>
  );
}
