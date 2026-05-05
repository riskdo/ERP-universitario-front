import { ClipboardCheck, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { estoqueService } from '../api/estoqueService';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Table from '../components/UI/Table';
import Toast from '../components/UI/Toast';

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [entrada, setEntrada] = useState({ produtoId: '', quantidade: '' });
  const [saida, setSaida] = useState({ produtoId: '', quantidade: '' });
  const [ajuste, setAjuste] = useState({ produtoId: '', saldoAjustado: '', justificativa: '' });
  const [toast, setToast] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const data = await estoqueService.listarProdutos();
    setProdutos([...data]);
  }

  async function handleEntrada(event) {
    event.preventDefault();
    await estoqueService.registrarEntrada(entrada);
    setEntrada({ produtoId: '', quantidade: '' });
    setToast('Entrada registrada.');
    carregarProdutos();
  }

  async function handleSaida(event) {
    event.preventDefault();
    await estoqueService.registrarSaida(saida);
    setSaida({ produtoId: '', quantidade: '' });
    setToast('Saida registrada.');
    carregarProdutos();
  }

  async function handleAjuste(event) {
    event.preventDefault();
    await estoqueService.ajustarEstoque(ajuste.produtoId, ajuste);
    setAjuste({ produtoId: '', saldoAjustado: '', justificativa: '' });
    setToast('Inventario ajustado.');
    carregarProdutos();
  }

  const produtoOptions = produtos.map((produto) => (
    <option key={produto.id} value={produto.id}>
      {produto.nome}
    </option>
  ));

  const columns = [
    { key: 'nome', label: 'Produto' },
    { key: 'sku', label: 'SKU' },
    { key: 'saldoAtual', label: 'Saldo' },
    { key: 'estoqueMinimo', label: 'Minimo' },
    { key: 'status', label: 'Status', render: (row) => (row.saldoAtual < row.estoqueMinimo ? <span className="badge badge-vencida">Reposicao</span> : <span className="badge badge-liquidada">Normal</span>) },
  ];

  return (
    <section className="page-stack">
      <div className="summary-grid compact">
        <div className="metric-mini">
          <strong>{produtos.length}</strong>
          <span>Produtos cadastrados</span>
        </div>
        <div className="metric-mini">
          <strong>{produtos.filter((item) => item.saldoAtual < item.estoqueMinimo).length}</strong>
          <span>Abaixo do minimo</span>
        </div>
      </div>

      <article className="panel">
        <h2>Produtos em estoque</h2>
        <Table columns={columns} data={produtos} />
      </article>

      <div className="three-columns">
        <form className="panel form-stack" onSubmit={handleEntrada}>
          <h2>Entrada</h2>
          <Select label="Produto" value={entrada.produtoId} onChange={(event) => setEntrada({ ...entrada, produtoId: event.target.value })} required>
            <option value="">Selecione</option>
            {produtoOptions}
          </Select>
          <Input label="Quantidade" type="number" min="1" value={entrada.quantidade} onChange={(event) => setEntrada({ ...entrada, quantidade: event.target.value })} required />
          <Button type="submit">
            <Plus size={17} />
            Registrar
          </Button>
        </form>

        <form className="panel form-stack" onSubmit={handleSaida}>
          <h2>Saida</h2>
          <Select label="Produto" value={saida.produtoId} onChange={(event) => setSaida({ ...saida, produtoId: event.target.value })} required>
            <option value="">Selecione</option>
            {produtoOptions}
          </Select>
          <Input label="Quantidade" type="number" min="1" value={saida.quantidade} onChange={(event) => setSaida({ ...saida, quantidade: event.target.value })} required />
          <Button type="submit" variant="secondary">
            <Minus size={17} />
            Registrar
          </Button>
        </form>

        <form className="panel form-stack" onSubmit={handleAjuste}>
          <h2>Inventario</h2>
          <Select label="Produto" value={ajuste.produtoId} onChange={(event) => setAjuste({ ...ajuste, produtoId: event.target.value })} required>
            <option value="">Selecione</option>
            {produtoOptions}
          </Select>
          <Input label="Saldo ajustado" type="number" min="0" value={ajuste.saldoAjustado} onChange={(event) => setAjuste({ ...ajuste, saldoAjustado: event.target.value })} required />
          <Input label="Justificativa" value={ajuste.justificativa} onChange={(event) => setAjuste({ ...ajuste, justificativa: event.target.value })} required />
          <Button type="submit" variant="outline">
            <ClipboardCheck size={17} />
            Ajustar
          </Button>
        </form>
      </div>
      <Toast message={toast} onClose={() => setToast('')} />
    </section>
  );
}
