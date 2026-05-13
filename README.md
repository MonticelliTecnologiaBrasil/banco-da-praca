# Banco da Praça — Frontend

Plataforma para contratação de soluções de tecnologia. Catálogo de produtos, solicitações personalizadas e painel administrativo.

## Stack

| Tecnologia | Versão |
|---|---|
| React | 18 |
| TypeScript | 5.8 |
| Vite | 5.4 |
| Tailwind CSS | 3.4 |
| shadcn/ui | Radix + Tailwind |
| Framer Motion | 12 |
| TanStack React Query | 5 |

## Pré-requisitos

- Node.js 18+ (recomendado via [nvm](https://github.com/nvm-sh/nvm))
- npm 9+

## Como Rodar

O frontend depende do backend rodando. Inicie os dois em terminais separados.

### 1. Backend

```bash
cd servicos-backend
./run.sh
```

O backend sobe em `http://localhost:8080`.

### 2. Frontend

```bash
cd banco-da-praca
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`.

> O Vite está configurado com CORS permitindo `localhost:5173` → `localhost:8080`.
> Nenhum proxy ou configuração adicional é necessária.

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (porta 5173) |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Verificação de código |
| `npm test` | Executar testes (Vitest) |

## Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Index | Landing page |
| `/auth` | Auth | Login / Cadastro |
| `/catalogo` | Catalog | Catálogo de soluções |
| `/dashboard` | Dashboard | Minhas solicitações (autenticado) |
| `/nova-solicitacao` | NewRequest | Criar solicitação (autenticado) |
| `/admin` | AdminPanel | Painel admin (admin) |

## Estrutura

```
src/
├── api/              Cliente HTTP para o backend Spring Boot
├── components/       Navbar, Footer, Hero, UI (shadcn)
├── hooks/            useAuth, useToast, useMobile
├── pages/            Index, Auth, Catalog, Dashboard, NewRequest, AdminPanel, NotFound
├── lib/              Utilitários (cn)
├── integrations/     (legado Supabase — mantido como referência)
└── test/             Setup de testes
```

## Usuários de Teste

| Tipo | Email | Senha |
|------|-------|-------|
| Admin | admin@email.com | 123456 |
| Usuário | maria@email.com | 123456 |
