import { apiUrls, request, useMocks } from './httpClient';
import { funcionariosMock, listarFuncionariosMock } from '../mocks/rhMock';

export const rhService = {
  async listarFuncionarios() {
    return useMocks ? listarFuncionariosMock() : request(apiUrls.rh, '/rh/funcionarios');
  },

  async criarFuncionario(data) {
    if (useMocks) {
      const funcionario = { id: Date.now(), ...data };
      funcionariosMock.unshift(funcionario);
      return funcionario;
    }

    return request(apiUrls.rh, '/rh/funcionarios', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
