import { useEffect, useState } from 'react';
import { comprasService } from '../api/comprasService';
import Table from '../components/UI/Table';
import { formatCurrency, statusBadge } from './helpers';

export default function Compras() {
  const [fornecedores, setFornecedores] = useState([]);
  const [ordens, setOrdens] = useState([]);

  useEffect(() => {
    Promise.all([comprasService.listarFornecedores(), comprasService.listarOrdensCompra()]).then(([fornecedoresData, ordensData]) => {
      setFornecedores([...fornecedoresData]);
      setOrdens([...ordensData]);
    });
  }, []);

  const fornecedoresColumns = [
    { key: 'nome', label: 'Fornecedor' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'contato', label: 'Contato' },
  ];

  const ordensColumns = [
    { key: 'id', label: 'OC' },
    { key: 'fornecedor', label: 'Fornecedor' },
    { key: 'emissao', label: 'Emissao' },
    { key: 'valor', label: 'Valor', render: (row) => formatCurrency(row.valor) },
    { key: 'status', label: 'Status', render: (row) => statusBadge(row.status) },
  ];

  return (
    <section className="page-stack">
      <div className="two-columns">
        <article className="panel">
          <h2>Fornecedores</h2>
          <Table columns={fornecedoresColumns} data={fornecedores} />
        </article>
        <article className="panel">
          <h2>Ordens de compra</h2>
          <Table columns={ordensColumns} data={ordens} />
        </article>
      </div>
    </section>
  );
}
