import { FileText, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { rhService } from '../api/rhService';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Table from '../components/UI/Table';
import Toast from '../components/UI/Toast';
import { formatCurrency, maskCpf } from './helpers';

export default function RH() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({ nome: '', cpf: '', cargo: '', departamento: '', salarioBase: '', admissao: '' });

  useEffect(() => {
    rhService.listarFuncionarios().then((data) => setFuncionarios([...data]));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const funcionario = await rhService.criarFuncionario({ ...form, salarioBase: Number(form.salarioBase) });
    setFuncionarios((items) => [funcionario, ...items]);
    setForm({ nome: '', cpf: '', cargo: '', departamento: '', salarioBase: '', admissao: '' });
    setToast('Funcionario cadastrado.');
  }

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'cpf', label: 'CPF' },
    { key: 'cargo', label: 'Cargo' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'salarioBase', label: 'Salario base', render: (row) => formatCurrency(row.salarioBase) },
    { key: 'admissao', label: 'Admissao' },
    {
      key: 'holerite',
      label: 'Holerite',
      render: () => (
        <button className="link-action" type="button">
          <FileText size={16} />
          Acessar
        </button>
      ),
    },
  ];

  return (
    <section className="page-stack">
      <article className="panel">
        <h2>Novo funcionario</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <Input label="Nome" value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} required />
          <Input label="CPF" value={form.cpf} onChange={(event) => setForm({ ...form, cpf: maskCpf(event.target.value) })} required />
          <Input label="Cargo" value={form.cargo} onChange={(event) => setForm({ ...form, cargo: event.target.value })} required />
          <Input label="Departamento" value={form.departamento} onChange={(event) => setForm({ ...form, departamento: event.target.value })} required />
          <Input label="Salario base" type="number" min="0" step="0.01" value={form.salarioBase} onChange={(event) => setForm({ ...form, salarioBase: event.target.value })} required />
          <Input label="Admissao" type="date" value={form.admissao} onChange={(event) => setForm({ ...form, admissao: event.target.value })} required />
          <Button type="submit">
            <UserPlus size={17} />
            Cadastrar
          </Button>
        </form>
      </article>

      <article className="panel">
        <h2>Funcionarios</h2>
        <Table columns={columns} data={funcionarios} />
      </article>
      <Toast message={toast} onClose={() => setToast('')} />
    </section>
  );
}
