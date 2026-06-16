# "Banco da Praça" — Frontend

Plataforma de contratação de serviços/soluções de tecnologia. Originalmente gerada com Lovable.dev, migrada de Supabase para backend próprio (Java Spring Boot).

## Tech Stack

- React 18 + TypeScript
- Vite (bundler/dev server)
- React Router v6 (SPA routing)
- TanStack React Query (data fetching)
- shadcn/ui + Radix UI + Tailwind CSS (design system)
- React Hook Form + Zod (formulários)
- Vitest (testes)

## Estrutura do Projeto

```
src/
├── api/
│   └── client.ts          # API client central — fetch wrapper + JWT management
├── components/
│   ├── ui/                # shadcn/ui components (botão, input, card, dialog, etc.)
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── Navbar.tsx
│   ├── NavLink.tsx
│   ├── PixSection.tsx
│   └── Services.tsx
├── hooks/
│   ├── useAuth.tsx        # Hook de autenticação (lê token, busca /auth/me)
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   └── utils.ts           # Utilitários (cn() para classnames)
├── pages/
│   ├── Index.tsx          # Landing page
│   ├── Catalog.tsx        # Catálogo de soluções
│   ├── Auth.tsx           # Login/Cadastro
│   ├── Dashboard.tsx      # Solicitações do usuário
│   ├── NewRequest.tsx     # Criar nova solicitação
│   ├── AdminPanel.tsx     # Gerenciar solicitações (admin)
│   └── NotFound.tsx       # 404
├── integrations/          # (resquícios do Supabase, não utilizados)
├── App.tsx                # Rotas + providers
└── main.tsx               # Entry point
```

## Rotas

| Path | Página | Descrição |
|------|--------|-----------|
| `/` | Index | Landing page |
| `/auth` | Auth | Login / Cadastro |
| `/catalogo` | Catalog | Catálogo de soluções |
| `/dashboard` | Dashboard | Solicitações do usuário |
| `/nova-solicitacao` | NewRequest | Criar solicitação |
| `/admin` | AdminPanel | Admin gerencia solicitações |

## API Client

`src/api/client.ts` contém:

- `getToken()` / `setToken()` — JWT no localStorage
- `getTokenPayload()` — decode do payload sem verificar assinatura
- `api.auth` — login, register, me
- `api.solutions` — list, getBySlug
- `api.plans` — list, bySolution
- `api.requests` — list, create
- `api.admin` — listRequests, updateRequest

Toda requisição inclui `Authorization: Bearer <token>` automaticamente se o token existir.

## Autenticação

O hook `useAuth` em `src/hooks/useAuth.tsx`:

1. Verifica se há token no localStorage
2. Se sim, chama `GET /api/v1/auth/me` para validar e carregar dados
3. Expõe `{ user, loading, isAdmin, signOut }`

Não há refresh token implementado — ao expirar, o usuário precisa logar novamente.

## Backend

A API esperada roda em `http://localhost:8080/api/v1`. Configurar em `src/api/client.ts` se necessário.

Usuários de teste:

| Email | Senha | Role |
|-------|-------|------|
| admin@email.com | 123456 | ADMIN |
| maria@email.com | 123456 | CLIENT |

## Como Executar

```bash
npm install        # instalar dependências
npm run dev        # dev server em http://localhost:5173
npm run build      # build de produção
npm run test       # rodar testes (vitest)
npm run lint       # eslint
```

## Convenções

- **Estilos**: Tailwind CSS + shadcn/ui (variáveis CSS em `:root`)
- **Componentização**: Prefira componentes pequenos em `components/`, páginas em `pages/`
- **Data fetching**: Usar TanStack React Query com o `api` client
- **Formulários**: React Hook Form + Zod schema validation
