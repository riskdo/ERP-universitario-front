export const contasPagarMock = [
  { id: 1, descricao: 'Fornecedor TechParts', vencimento: '2026-05-10', valor: 4250.9, status: 'pendente' },
  { id: 2, descricao: 'Aluguel administrativo', vencimento: '2026-04-28', valor: 6200, status: 'vencida' },
  { id: 3, descricao: 'Internet corporativa', vencimento: '2026-05-05', valor: 899.9, status: 'liquidada' },
];

export const contasReceberMock = [
  { id: 1, descricao: 'Contrato Campus Norte', vencimento: '2026-05-15', valor: 12500, status: 'pendente' },
  { id: 2, descricao: 'Mensalidade laboratorio', vencimento: '2026-04-30', valor: 3200, status: 'vencida' },
  { id: 3, descricao: 'Servico de suporte', vencimento: '2026-05-02', valor: 4800, status: 'liquidada' },
];

export async function listarContasPagarMock() {
  return contasPagarMock;
}

export async function listarContasReceberMock() {
  return contasReceberMock;
}
