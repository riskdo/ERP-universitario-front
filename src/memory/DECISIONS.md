# DECISIONS

## React + Vite

React + Vite foi escolhido por simplicidade, velocidade de desenvolvimento e boa aderencia a projetos academicos de frontend moderno.

## JavaScript

JavaScript foi escolhido em vez de TypeScript para facilitar manutencao por estudantes iniciantes de ADS.

## Mocks temporarios

Os mocks permitem desenvolver e demonstrar o frontend enquanto os servicos FastAPI ainda nao estao disponiveis.

## sessionStorage para token

O token JWT simulado fica em `sessionStorage`, suficiente para ambiente academico e para limpar a sessao ao fechar o navegador.

## CSS variables para temas

Temas claro e escuro usam CSS variables para evitar dependencias externas e manter o estilo facil de entender.

## Services por modulo

Cada modulo tem um service proprio para deixar os contratos explicitos e reduzir acoplamento entre telas e infraestrutura.
