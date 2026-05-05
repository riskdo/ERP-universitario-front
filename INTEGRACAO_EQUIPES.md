# Integracao das Equipes com o Frontend ERP

Este documento explica o que cada equipe de backend precisa entregar para integrar com o frontend React + Vite do Portal ERP.

## Configuracao geral

O frontend deve rodar em:

```text
http://localhost:3000
```

Cada backend deve liberar CORS para:

```text
http://localhost:3000
```

As respostas devem ser em JSON.

Quando a autenticacao real estiver ativa, o frontend enviara o token no header:

```http
Authorization: Bearer <access_token>
```

Codigos de erro esperados:

```text
401 = sessao expirada ou usuario nao autorizado
403 = acesso negado
404 = recurso nao encontrado
500 = erro interno do servidor
```

Para testar a integracao real, o frontend deve usar:

```env
VITE_USE_MOCKS=false
```

As URLs ficam no arquivo `.env`:

```env
VITE_CORE_API_URL=http://localhost:8000
VITE_FINANCEIRO_API_URL=http://localhost:8001
VITE_RH_API_URL=http://localhost:8002
VITE_ESTOQUE_API_URL=http://localhost:8003
VITE_COMPRAS_API_URL=http://localhost:8004
VITE_USE_MOCKS=false
```

## Equipe Core/Auth

Porta:

```text
8000
```

Base URL:

```text
http://localhost:8000
```

Endpoints esperados:

```http
POST /auth/login
POST /auth/refresh
POST /auth/verify
```

O endpoint de login deve receber email e senha.

Exemplo de resposta esperada:

```json
{
  "access_token": "jwt_aqui",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "nome": "Funcionario ERP",
    "email": "funcionario@erp.local",
    "perfil": "Administrador"
  }
}
```

Campos importantes para manter iguais:

```text
access_token
token_type
user.id
user.nome
user.email
user.perfil
```

## Equipe Financeiro

Porta:

```text
8001
```

Base URL:

```text
http://localhost:8001
```

Endpoints esperados:

```http
GET /financeiro/contas-pagar
POST /financeiro/contas-pagar
GET /financeiro/contas-receber
POST /financeiro/contas-receber
GET /financeiro/fluxo-caixa
GET /financeiro/contas-vencidas
```

Formato esperado para contas a pagar e contas a receber:

```json
{
  "id": 1,
  "descricao": "Fornecedor TechParts",
  "vencimento": "2026-05-10",
  "valor": 4250.90,
  "status": "pendente"
}
```

Status aceitos:

```text
pendente
vencida
liquidada
```

Campos importantes para manter iguais:

```text
id
descricao
vencimento
valor
status
```

## Equipe RH/Folha

Porta:

```text
8002
```

Base URL:

```text
http://localhost:8002
```

Endpoints esperados:

```http
GET /rh/funcionarios
POST /rh/funcionarios
GET /rh/holerite/{func_id}/{ano}/{mes}
```

Formato esperado para funcionario:

```json
{
  "id": 1,
  "nome": "Joao Silva",
  "cpf": "123.456.789-01",
  "cargo": "Analista de Sistemas",
  "departamento": "TI",
  "salarioBase": 5200,
  "admissao": "2024-02-12"
}
```

Campos importantes para manter iguais:

```text
id
nome
cpf
cargo
departamento
salarioBase
admissao
```

Observacao importante: o frontend espera `salarioBase` em camelCase.

## Equipe Estoque/Almoxarifado

Porta:

```text
8003
```

Base URL:

```text
http://localhost:8003
```

Endpoints esperados:

```http
GET /estoque/produtos
POST /estoque/produtos
POST /estoque/movimentacoes/entrada
POST /estoque/movimentacoes/saida
GET /estoque/alertas
POST /estoque/inventario/{prod_id}
```

Formato esperado para produto:

```json
{
  "id": 1,
  "nome": "Teclado mecanico",
  "sku": "TEC-001",
  "saldoAtual": 18,
  "estoqueMinimo": 10,
  "unidade": "un"
}
```

Formato esperado para entrada e saida:

```json
{
  "produtoId": 1,
  "quantidade": 5
}
```

Formato esperado para inventario:

```json
{
  "produtoId": 1,
  "saldoAjustado": 20,
  "justificativa": "Ajuste apos contagem fisica"
}
```

Campos importantes para manter iguais:

```text
id
nome
sku
saldoAtual
estoqueMinimo
unidade
produtoId
quantidade
saldoAjustado
justificativa
```

Observacao importante: o frontend espera `saldoAtual`, `estoqueMinimo`, `produtoId` e `saldoAjustado` em camelCase.

## Equipe Compras/Fornecedores

Porta:

```text
8004
```

Base URL:

```text
http://localhost:8004
```

Endpoints esperados:

```http
GET /compras/fornecedores
POST /compras/fornecedores
GET /compras/ordens
```

Formato esperado para fornecedor:

```json
{
  "id": 1,
  "nome": "TechParts Brasil",
  "cnpj": "12.345.678/0001-90",
  "contato": "compras@techparts.com"
}
```

Formato esperado para ordem de compra:

```json
{
  "id": 101,
  "fornecedor": "TechParts Brasil",
  "emissao": "2026-05-01",
  "valor": 18400,
  "status": "aberta"
}
```

Status aceitos:

```text
aberta
parcial
encerrada
```

Campos importantes para manter iguais:

```text
id
nome
cnpj
contato
fornecedor
emissao
valor
status
```

## Recomendacao final para todas as equipes

Antes da apresentacao, cada equipe deve testar seu modulo isoladamente e confirmar:

```text
1. O servidor sobe na porta correta.
2. O CORS permite http://localhost:3000.
3. Os endpoints respondem JSON.
4. Os nomes dos campos batem com este documento.
5. Os status HTTP de erro estao corretos.
6. O token Bearer e aceito nos endpoints protegidos.
```

Se algum backend usar nomes diferentes, o frontend precisara adaptar o service correspondente em `src/api/`.
