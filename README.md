# Mundo Rao -- Super-App Marketplace

![CI](https://github.com/institutoveigacabral-maker/mundao/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Super-app marketplace do ecossistema Grupo Rao. Plataforma completa de delivery com catalogo de produtos, carrinho de compras, carteira digital, historico de pedidos e autenticacao OAuth. Construido sobre Cloudflare Workers com Hono no backend e React no frontend.

---

## Stack Tecnologico

| Camada     | Tecnologia                          |
| ---------- | ----------------------------------- |
| Runtime    | Cloudflare Workers                  |
| API        | Hono + Zod (validacao de schemas)   |
| Frontend   | React 19 + TypeScript               |
| Build      | Vite 7 + @cloudflare/vite-plugin    |
| Estilo     | Tailwind CSS + PostCSS              |
| Banco      | Cloudflare D1 (SQLite)              |
| Storage    | Cloudflare R2                       |
| Auth       | OAuth (Google) via Mocha Users Service |
| Testes     | Vitest                              |
| Lint       | ESLint 9 + typescript-eslint        |
| Formatacao | Prettier                            |

## Funcionalidades

- **Marketplace** -- Catalogo de produtos com categorias, busca e filtragem
- **Carrinho de compras** -- Adicao, remocao e calculo automatico de totais
- **Pedidos** -- Criacao de pedidos com tracking code e historico completo
- **Carteira digital** -- Saldo, transacoes e historico de movimentacoes
- **Perfil do usuario** -- Autenticacao OAuth Google, dados do perfil, gamificacao (nivel + pontos)
- **API RESTful** -- Endpoints validados com Zod, CORS configurado, cookies seguros

## Arquitetura

```
src/
  react-app/          # Frontend React
    components/       # Componentes reutilizaveis (Navigation)
    contexts/         # Context API (CartContext)
    pages/            # Paginas da aplicacao
      Home.tsx
      Marketplace.tsx
      Product.tsx
      Orders.tsx
      Wallet.tsx
      Profile.tsx
      AuthCallback.tsx
  shared/             # Codigo compartilhado entre frontend e backend
    types.ts          # Schemas Zod + tipos TypeScript
  worker/             # Backend Cloudflare Worker
    index.ts          # API Hono (rotas, auth, CRUD)
__tests__/            # Testes unitarios
  cart-logic.test.ts
  schemas.test.ts
  worker-routes.test.ts
```

### Endpoints da API

| Metodo | Rota                             | Auth | Descricao                   |
| ------ | -------------------------------- | ---- | --------------------------- |
| GET    | `/api/categories`                | Nao  | Listar categorias ativas    |
| GET    | `/api/products`                  | Nao  | Listar produtos (filtro por categoria) |
| GET    | `/api/products/:id`              | Nao  | Detalhe de um produto       |
| GET    | `/api/oauth/google/redirect_url` | Nao  | URL de redirect OAuth       |
| POST   | `/api/sessions`                  | Nao  | Criar sessao (troca code)   |
| GET    | `/api/users/me`                  | Sim  | Perfil do usuario logado    |
| GET    | `/api/logout`                    | Nao  | Encerrar sessao             |
| GET    | `/api/wallet`                    | Sim  | Saldo e transacoes          |
| POST   | `/api/orders`                    | Sim  | Criar pedido                |
| GET    | `/api/orders`                    | Sim  | Historico de pedidos        |

## Setup Local

### Pre-requisitos

- Node.js >= 18
- npm
- Conta Cloudflare (para D1 e R2)

### Instalacao

```bash
git clone https://github.com/institutoveigacabral-maker/mundao.git
cd mundao
npm install
```

### Variaveis de Ambiente

Crie um arquivo `.dev.vars` na raiz do projeto com as seguintes variaveis:

```
MOCHA_USERS_SERVICE_API_URL=<url-do-servico-de-usuarios>
MOCHA_USERS_SERVICE_API_KEY=<chave-api>
```

### Executar em desenvolvimento

```bash
npm run dev
```

O servidor Vite inicia em `http://localhost:5173` com HMR. O worker Hono roda integrado via `@cloudflare/vite-plugin`.

## Scripts

| Comando              | Descricao                                       |
| -------------------- | ----------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento com Vite + Workers  |
| `npm run build`      | Build de producao (TypeScript + Vite)            |
| `npm run check`      | Verificacao completa (tsc + build + dry-run deploy) |
| `npm test`           | Executar testes com Vitest                       |
| `npm run lint`       | Lint com ESLint                                  |
| `npm run format`     | Formatar codigo com Prettier                     |
| `npm run format:check` | Verificar formatacao                           |
| `npm run cf-typegen` | Gerar tipos do Cloudflare (wrangler types)       |

## Deploy

O deploy e feito no Cloudflare Workers. O projeto utiliza:

- **D1 Database** -- Banco de dados SQLite na edge
- **R2 Bucket** -- Armazenamento de objetos (imagens, assets)
- **SPA mode** -- Configurado com `not_found_handling: "single-page-application"`

```bash
# Build e deploy
npm run build
npx wrangler deploy
```

Para dry-run (validacao sem deploy):

```bash
npm run check
```

## Testes

O projeto possui testes unitarios cobrindo logica de carrinho, validacao de schemas e rotas do worker.

```bash
npm test
```

## Contribuindo

Ver [CONTRIBUTING.md](CONTRIBUTING.md).

## Licenca

MIT -- ver [LICENSE](LICENSE).
