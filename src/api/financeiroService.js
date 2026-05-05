import { apiUrls, request, useMocks } from './httpClient';
import { contasPagarMock, contasReceberMock, listarContasPagarMock, listarContasReceberMock } from '../mocks/financeiroMock';

export const financeiroService = {
  async listarContasPagar() {
    return useMocks ? listarContasPagarMock() : request(apiUrls.financeiro, '/financeiro/contas-pagar');
  },

  async listarContasReceber() {
    return useMocks ? listarContasReceberMock() : request(apiUrls.financeiro, '/financeiro/contas-receber');
  },

  async criarContaPagar(data) {
    if (useMocks) {
      const novaConta = { id: Date.now(), ...data };
      contasPagarMock.unshift(novaConta);
      return novaConta;
    }

    return request(apiUrls.financeiro, '/financeiro/contas-pagar', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async criarContaReceber(data) {
    if (useMocks) {
      const novaConta = { id: Date.now(), ...data };
      contasReceberMock.unshift(novaConta);
      return novaConta;
    }

    return request(apiUrls.financeiro, '/financeiro/contas-receber', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
