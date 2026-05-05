import { apiUrls, request, useMocks } from './httpClient';
import { listarProdutosMock, produtosMock } from '../mocks/estoqueMock';

export const estoqueService = {
  async listarProdutos() {
    return useMocks ? listarProdutosMock() : request(apiUrls.estoque, '/estoque/produtos');
  },

  async registrarEntrada(data) {
    if (useMocks) {
      alterarSaldo(data.produtoId, Number(data.quantidade));
      return data;
    }

    return request(apiUrls.estoque, '/estoque/movimentacoes/entrada', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async registrarSaida(data) {
    if (useMocks) {
      alterarSaldo(data.produtoId, -Number(data.quantidade));
      return data;
    }

    return request(apiUrls.estoque, '/estoque/movimentacoes/saida', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async ajustarEstoque(produtoId, data) {
    if (useMocks) {
      const produto = produtosMock.find((item) => item.id === Number(produtoId));
      if (produto) {
        produto.saldoAtual = Number(data.saldoAjustado);
      }
      return { produtoId, ...data };
    }

    return request(apiUrls.estoque, `/estoque/inventario/${produtoId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

function alterarSaldo(produtoId, quantidade) {
  const produto = produtosMock.find((item) => item.id === Number(produtoId));
  if (produto) {
    produto.saldoAtual = Math.max(0, produto.saldoAtual + quantidade);
  }
}
