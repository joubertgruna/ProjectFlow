# Deploy em Produção

Este guia prepara o projeto para subir no GitHub e em uma VPS usando Docker Compose.

## Pré-requisitos na VPS

- Docker Engine
- Docker Compose Plugin
- Git
- Um domínio apontando para a VPS, se quiser HTTPS
- Proxy reverso como Nginx, Caddy ou Traefik para TLS

## 1. Publicar no GitHub

Na raiz do projeto:

```bash
git status
git add .
git commit -m "Prepare production deployment"
git branch -M main
git remote add origin git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

Não versionar arquivos `.env`. Use apenas `.env.example` e `.env.production.example`.

## 2. Clonar na VPS

```bash
git clone git@github.com:SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
cp .env.production.example .env.production
```

Edite `.env.production` com senhas e URLs reais.

## 3. Variáveis obrigatórias

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=uma-senha-forte
POSTGRES_DB=projects_db

JWT_SECRET=um-segredo-longo-aleatorio

FRONTEND_URL=https://projectflow.lidedesk.com.br
VITE_API_URL=https://projectflow.lidedesk.com.br/api

BACKEND_PORT=127.0.0.1:3000
FRONTEND_PORT=127.0.0.1:8080

AI_PROVIDER=mock
OPENAI_API_KEY=
```

Se usar OpenAI real:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
```

## 4. Subir produção

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up --build -d
```

O backend aplica migrations automaticamente com:

```bash
npx prisma migrate deploy
```

## 5. Verificar serviços

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml ps
curl http://localhost:3000/health
```

Com o proxy reverso configurado, o frontend fica em:

```text
https://projectflow.lidedesk.com.br
```

A API fica sob o mesmo domínio, usando `/api`.

## 6. Atualizar produção depois de novos commits

```bash
git pull
docker compose --env-file .env.production -f docker-compose.prod.yml up --build -d
docker image prune -f
```

## 7. Logs

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml logs -f backend
docker compose --env-file .env.production -f docker-compose.prod.yml logs -f frontend
docker compose --env-file .env.production -f docker-compose.prod.yml logs -f postgres
```

## 8. Backup do banco

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml exec postgres \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup.sql
```

## 9. Proxy reverso sugerido

Exemplo Nginx para frontend e API no mesmo domínio:

```nginx
server {
  server_name projectflow.lidedesk.com.br;

  location /api/docs {
    proxy_pass http://127.0.0.1:3000/api/docs;
  }

  location /api/ {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_pass http://127.0.0.1:3000;
  }

  location / {
    proxy_pass http://127.0.0.1:8080;
  }
}
```

Depois configure HTTPS com Certbot ou use Caddy para automatizar certificados.

## 10. Checklist antes do deploy

- `JWT_SECRET` forte e privado.
- `POSTGRES_PASSWORD` forte e privado.
- `FRONTEND_URL` igual à URL pública do frontend.
- `VITE_API_URL` igual à URL pública da API, por exemplo `https://projectflow.lidedesk.com.br/api`.
- `AI_PROVIDER=mock` se não for usar OpenAI.
- Migrations versionadas em `backend/prisma/migrations`.
- `docker compose --env-file .env.production -f docker-compose.prod.yml config` sem erros.
