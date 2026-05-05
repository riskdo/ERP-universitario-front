export const produtosMock = [
  { id: 1, nome: 'Teclado mecanico', sku: 'TEC-001', saldoAtual: 18, estoqueMinimo: 10, unidade: 'un' },
  { id: 2, nome: 'Mouse optico', sku: 'MOU-002', saldoAtual: 7, estoqueMinimo: 12, unidade: 'un' },
  { id: 3, nome: 'Monitor 24 polegadas', sku: 'MON-024', saldoAtual: 5, estoqueMinimo: 6, unidade: 'un' },
  { id: 4, nome: 'Cadeira ergonomica', sku: 'CAD-ERG', saldoAtual: 9, estoqueMinimo: 8, unidade: 'un' },
  { id: 5, nome: 'Notebook i5', sku: 'NOTE-I5', saldoAtual: 3, estoqueMinimo: 5, unidade: 'un' },
];

export async function listarProdutosMock() {
  return produtosMock;
}
