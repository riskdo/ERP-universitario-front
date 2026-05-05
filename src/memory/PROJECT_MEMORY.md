# PROJECT_MEMORY

## Objetivo

Criar um frontend web para um ERP distribuido academico, servindo como ponto unico de interacao humana com modulos FastAPI independentes.

## Tecnologias usadas

- React
- Vite
- JavaScript
- React Router
- CSS proprio com CSS variables
- Fetch API para integracao REST

## Modulos existentes

- Core/Auth na porta 8000
- Financeiro na porta 8001
- RH/Folha na porta 8002
- Estoque/Almoxarifado na porta 8003
- Compras/Fornecedores na porta 8004
- Frontend na porta 3000

## Decisoes importantes

- O frontend usa mocks por padrao porque os backends ainda nao estao prontos.
- A autenticacao JWT e simulada e salva em `sessionStorage`.
- As rotas internas sao protegidas por `PrivateRoute`.
- A preferencia de tema e salva em `localStorage`.
- Services em `src/api/` isolam a troca entre mocks e APIs reais.

## Integracao com backends

Cada modulo tem uma URL configuravel por variavel `VITE_*_API_URL`. Quando `VITE_USE_MOCKS=false`, os services chamam endpoints REST usando `fetch` e enviam `Authorization: Bearer <token>` quando houver token.
