# Portal ERP Web Academico

Frontend React + Vite para um ERP distribuido academico de Sistemas Distribuidos. A aplicacao usa mocks por padrao enquanto os backends FastAPI ainda nao estao prontos.

## Como instalar

```bash
npm install
```

## Como rodar

```bash
npm run dev
```

Acesse `http://localhost:3000`.

O login mock aceita qualquer email e senha preenchidos.

## Estrutura de pastas

```text
src/
  api/          services e httpClient para mocks ou APIs reais
  mocks/        dados simulados dos modulos
  components/   layout e componentes reutilizaveis
  pages/        telas do portal
  routes/       rotas publicas e protegidas
  store/        sessao e preferencia de tema
  styles/       CSS global com temas
  memory/       memoria persistente do projeto
```

## Como trocar mocks por APIs reais

1. Copie `.env.example` para `.env`.
2. Ajuste as URLs dos modulos, se necessario.
3. Altere `VITE_USE_MOCKS=true` para `VITE_USE_MOCKS=false`.
4. Confirme se os endpoints documentados em `src/memory/API_CONTRACTS.md` estao disponiveis nos backends FastAPI.

Os services em `src/api/` ja centralizam essa decisao. Exemplo: `financeiroService.listarContasPagar()` usa mock quando `VITE_USE_MOCKS=true` e usa `fetch` quando `false`.

## Modulos

- Core/Auth: autenticacao simulada JWT e logout.
- Dashboard: indicadores consolidados dos modulos.
- Financeiro: contas a pagar, contas a receber e criacao visual de conta.
- RH/Folha: funcionarios, cadastro, CPF mascarado e acesso visual a holerite.
- Estoque/Almoxarifado: produtos, alertas, entrada, saida e inventario.
- Compras/Fornecedores: fornecedores e ordens de compra.

## Tratamento de erros

O `httpClient` traduz respostas `401`, `403`, `404` e `500` para mensagens amigaveis. Em `401`, a sessao local e limpa para forcar novo login.
