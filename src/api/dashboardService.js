import { apiUrls, request, useMocks } from './httpClient';
import { getResumoMock } from '../mocks/dashboardMock';

export const dashboardService = {
  async getResumo() {
    if (useMocks) {
      return getResumoMock();
    }

    const [fluxoCaixa, contasVencidas, funcionarios, produtos, ordens] = await Promise.all([
      request(apiUrls.financeiro, '/financeiro/fluxo-caixa'),
      request(apiUrls.financeiro, '/financeiro/contas-vencidas'),
      request(apiUrls.rh, '/rh/funcionarios'),
      request(apiUrls.estoque, '/estoque/alertas'),
      request(apiUrls.compras, '/compras/ordens'),
    ]);

    return {
      financeiro: {
        saldoFluxoCaixaMes: fluxoCaixa.saldo_mes,
        contasVencidas: contasVencidas.length,
      },
      rh: {
        funcionariosAtivos: funcionarios.length,
        folhasAbertas: funcionarios.folhas_abertas || 0,
      },
      estoque: {
        produtosAlertaReposicao: produtos.length,
      },
      compras: {
        ordensCompraAbertas: ordens.filter((ordem) => ordem.status === 'aberta').length,
      },
    };
  },
};
