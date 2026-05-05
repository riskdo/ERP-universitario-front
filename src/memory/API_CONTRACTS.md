# API_CONTRACTS

## Core/Auth - porta 8000

- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/verify`

## Financeiro - porta 8001

- `GET /financeiro/contas-pagar`
- `POST /financeiro/contas-pagar`
- `GET /financeiro/contas-receber`
- `POST /financeiro/contas-receber`
- `GET /financeiro/fluxo-caixa`
- `GET /financeiro/contas-vencidas`

## RH/Folha - porta 8002

- `GET /rh/funcionarios`
- `POST /rh/funcionarios`
- `GET /rh/holerite/{func_id}/{ano}/{mes}`

## Estoque/Almoxarifado - porta 8003

- `GET /estoque/produtos`
- `POST /estoque/produtos`
- `POST /estoque/movimentacoes/entrada`
- `POST /estoque/movimentacoes/saida`
- `GET /estoque/alertas`
- `POST /estoque/inventario/{prod_id}`

## Compras/Fornecedores - porta 8004

- `GET /compras/fornecedores`
- `POST /compras/fornecedores`
- `GET /compras/ordens`

## Observacoes de payload

Os payloads atuais seguem os campos usados nos mocks. Ao conectar os backends reais, valide nomes como `salarioBase`, `saldoAtual`, `estoqueMinimo`, `access_token` e `status`.
