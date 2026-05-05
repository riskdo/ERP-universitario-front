export const fornecedoresMock = [
  { id: 1, nome: 'TechParts Brasil', cnpj: '12.345.678/0001-90', contato: 'compras@techparts.com' },
  { id: 2, nome: 'Moveis Office Pro', cnpj: '45.987.222/0001-10', contato: 'atendimento@officepro.com' },
  { id: 3, nome: 'Distribuidora Campus', cnpj: '88.111.333/0001-55', contato: 'vendas@campusdist.com' },
];

export const ordensCompraMock = [
  { id: 101, fornecedor: 'TechParts Brasil', emissao: '2026-05-01', valor: 18400, status: 'aberta' },
  { id: 102, fornecedor: 'Moveis Office Pro', emissao: '2026-04-25', valor: 9200, status: 'parcial' },
  { id: 103, fornecedor: 'Distribuidora Campus', emissao: '2026-04-10', valor: 5600, status: 'encerrada' },
];

export async function listarFornecedoresMock() {
  return fornecedoresMock;
}

export async function listarOrdensCompraMock() {
  return ordensCompraMock;
}
