# NEXT_STEPS

## Comandos para rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Proximos passos


- Manter `VITE_USE_MOCKS=true` enquanto os backends nao estiverem prontos.
- Quando os backends FastAPI estiverem ativos, mudar para `VITE_USE_MOCKS=false`.
- Validar os nomes dos campos retornados pelos endpoints reais e ajustar os services em `src/api/` se houver diferencas.
- Adicionar testes de componentes e fluxo de login quando o contrato de API estabilizar.

## Onde alterar URLs reais

As URLs ficam no arquivo `.env`:

```env
VITE_CORE_API_URL=http://localhost:8000
VITE_FINANCEIRO_API_URL=http://localhost:8001
VITE_RH_API_URL=http://localhost:8002
VITE_ESTOQUE_API_URL=http://localhost:8003
VITE_COMPRAS_API_URL=http://localhost:8004
```

## Onde trocar mocks por APIs reais

Troque:

```env
VITE_USE_MOCKS=true
```

para:

```env
VITE_USE_MOCKS=false
```

A logica esta centralizada em `src/api/httpClient.js` e nos services de cada modulo.
