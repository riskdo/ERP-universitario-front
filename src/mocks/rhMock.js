export const funcionariosMock = [
  { id: 1, nome: 'Joao Silva', cpf: '123.456.789-01', cargo: 'Analista de Sistemas', departamento: 'TI', salarioBase: 5200, admissao: '2024-02-12' },
  { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00', cargo: 'Coordenadora Financeira', departamento: 'Financeiro', salarioBase: 6800, admissao: '2023-08-01' },
  { id: 3, nome: 'Pedro Lima', cpf: '456.789.123-10', cargo: 'Assistente de Compras', departamento: 'Compras', salarioBase: 3100, admissao: '2025-01-20' },
];

export async function listarFuncionariosMock() {
  return funcionariosMock;
}
