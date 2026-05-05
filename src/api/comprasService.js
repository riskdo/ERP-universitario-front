import { apiUrls, request, useMocks } from './httpClient';
import { listarFornecedoresMock, listarOrdensCompraMock } from '../mocks/comprasMock';

export const comprasService = {
  async listarFornecedores() {
    return useMocks ? listarFornecedoresMock() : request(apiUrls.compras, '/compras/fornecedores');
  },

  async listarOrdensCompra() {
    return useMocks ? listarOrdensCompraMock() : request(apiUrls.compras, '/compras/ordens');
  },
};
