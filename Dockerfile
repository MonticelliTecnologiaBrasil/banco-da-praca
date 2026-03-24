FROM node:18-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build   # gera a pasta dist/

FROM node:18-alpine

RUN npm install -g serve

WORKDIR /app

# Copia os arquivos estáticos gerados no build (dist)
COPY --from=builder /app/dist ./

EXPOSE 8080

# Serve os arquivos estáticos na porta 8080
CMD ["serve", "-s", ".", "-l", "8080"]