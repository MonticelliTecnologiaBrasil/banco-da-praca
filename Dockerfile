FROM node:18-alpine AS builder

# Pina o pnpm 10: o "latest" (pnpm 12+) exige Node mais novo que o node:18.
RUN npm install -g pnpm@10

WORKDIR /app

# pnpm-workspace.yaml contém a allowlist de scripts de build (onlyBuiltDependencies).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Vite injeta variáveis VITE_* em tempo de BUILD, não de execução.
# Passe a URL pública do backend ao gerar a imagem:
#   docker build --build-arg VITE_API_BASE_URL=https://api.seudominio.com/api/v1 .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN pnpm run build   # gera a pasta dist/

FROM node:18-alpine

RUN npm install -g serve

WORKDIR /app

# Copia os arquivos estáticos gerados no build (dist)
COPY --from=builder /app/dist ./

EXPOSE 8080

# Serve os arquivos estáticos na porta 8080
CMD ["serve", "-s", ".", "-l", "8080"]