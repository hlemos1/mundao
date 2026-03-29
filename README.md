# Mundo Rao

[![CI](https://github.com/hlemos1/mundao/actions/workflows/ci.yml/badge.svg)](https://github.com/hlemos1/mundao/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Edge-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Hono](https://img.shields.io/badge/Hono-API-E36002?style=flat-square&logo=hono&logoColor=white)](https://hono.dev)
[![Production](https://img.shields.io/badge/Status-Production-brightgreen?style=flat-square)](https://mundorao.vercel.app)

> Super-app marketplace powering the Mundo Rao ecosystem — 800k+ orders processed. Built on React + Hono + Cloudflare Workers for edge performance, connecting 200+ restaurant units across 10 Brazilian states and Portugal.

---

## ✨ Key Features

- **Marketplace** — Multi-vendor platform connecting suppliers and restaurant operators
- **Edge API** — Hono framework on Cloudflare Workers for global low-latency
- **800k+ Orders** — Battle-tested at scale across 10 states + Portugal
- **200+ Units** — Serving the entire Grupo Rao restaurant network
- **Real-time** — WebSocket-based order tracking and notifications
- **PWA** — Mobile-first progressive web app

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + TypeScript |
| **API** | Hono (edge-native framework) |
| **Runtime** | Cloudflare Workers (edge compute) |
| **Database** | D1 (Cloudflare) + Neon PostgreSQL |
| **Cache** | KV (Cloudflare) |
| **Auth** | JWT + Cloudflare Workers |
| **Observability** | Sentry |
| **CI/CD** | GitHub Actions |
| **Deploy** | Vercel (frontend) + Cloudflare Workers (API) |

---

## 🏗️ Architecture

```
mundao/
├── apps/
│   ├── web/             # React frontend (Vite)
│   └── api/             # Hono API (Cloudflare Workers)
├── packages/
│   ├── shared/          # Shared types & utilities
│   └── ui/              # Shared component library
└── .github/workflows/   # CI/CD pipelines
```

**Key design decisions:**
- Edge-first API with Cloudflare Workers for <50ms global response times
- Hono chosen for its TypeScript-first DX and Cloudflare Workers compatibility
- Monorepo structure for shared types between frontend and API

---

## 🌍 Scale

```
Mundo Rao Network
├── 800k+ orders processed
├── 200+ restaurant units active
├── 10 Brazilian states
├── Portugal (international)
└── Real-time inventory sync
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/hlemos1/mundao.git
cd mundao
pnpm install
cp .env.example .env.local
pnpm dev
```

---

## 🌐 Context

Mundo Rao is the marketplace layer of the [CORTEX3](https://github.com/hlemos1/hlemos1) ecosystem, powering the Grupo Rao delivery network with 800k+ orders and growing.

---

## 📄 License

MIT © [Henrique Lemos](https://github.com/hlemos1)
