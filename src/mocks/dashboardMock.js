export const dashboardResumoMock = {
  financeiro: {
    saldoFluxoCaixaMes: 42850.75,
    contasVencidas: 3,
  },
  rh: {
    funcionariosAtivos: 38,
    folhasAbertas: 1,
  },
  estoque: {
    produtosAlertaReposicao: 4,
  },
  compras: {
    ordensCompraAbertas: 7,
  },
};

export async function getResumoMock() {
  return dashboardResumoMock;
}
