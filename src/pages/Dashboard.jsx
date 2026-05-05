import { AlertCircle, Banknote, Boxes, ShoppingCart, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dashboardService } from '../api/dashboardService';
import CardResumo from '../components/UI/CardResumo';
import { formatCurrency } from './helpers';

export default function Dashboard() {
  const [resumo, setResumo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardService.getResumo().then(setResumo).catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!resumo) return <div className="loading">Carregando dashboard...</div>;

  return (
    <section className="page-stack">
      <div className="summary-grid">
        <CardResumo title="Fluxo de caixa do mes" value={formatCurrency(resumo.financeiro.saldoFluxoCaixaMes)} detail={`${resumo.financeiro.contasVencidas} contas vencidas`} icon={Banknote} tone="green" />
        <CardResumo title="Funcionarios ativos" value={resumo.rh.funcionariosAtivos} detail={`${resumo.rh.folhasAbertas} folha aberta`} icon={Users} tone="blue" />
        <CardResumo title="Alertas de reposicao" value={resumo.estoque.produtosAlertaReposicao} detail="Produtos abaixo do minimo" icon={Boxes} tone="orange" />
        <CardResumo title="Ordens em aberto" value={resumo.compras.ordensCompraAbertas} detail="Compras aguardando conclusao" icon={ShoppingCart} tone="purple" />
      </div>
      <div className="panel-grid">
        <article className="panel">
          <h2>Saude operacional</h2>
          <p className="muted">Resumo consolidado para acompanhamento gerencial dos modulos distribuidos.</p>
          <div className="timeline">
            <span>Financeiro com saldo positivo no mes</span>
            <span>Estoque exige reposicao de itens de TI</span>
            <span>RH com folha mensal em processamento</span>
          </div>
        </article>
        <article className="panel alert-panel">
          <AlertCircle size={24} />
          <div>
            <h2>Modo mock ativo</h2>
            <p>Os dados atuais sao simulados. Defina `VITE_USE_MOCKS=false` para usar os servicos REST reais.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function ErrorState({ message }) {
  return <div className="error-box">{message}</div>;
}
