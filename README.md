# Template de site personalizado (Estúdio Sites)

Scaffold mínimo **Astro + Cloudflare Workers** para clientes com origem Git.

- **Layout / código:** este repositório (edite depois que o painel gerar o repo do cliente).
- **Textos / preços:** painel Payload via `GET /api/site-vitrine/:slug` (ao vivo).

Espelho público do template. O repo privado `thiago-tap/estudiosites-site-template` tem o mesmo conteúdo (visível só logado como thiago-tap).

## Configurar uma vez

1. Neste repo: **Settings → General → Template repository** (marque a caixa).
2. No EasyPanel (app painel) → Environment:

```bash
GITHUB_SITE_TEMPLATE=thiago-tap/estudiosites-site-template-publico
```

Salve e faça Deploy do painel.

## Dev local

```bash
cp .env.example .env   # ajuste PAYLOAD_URL e SITE_TENANT
pnpm install
pnpm dev
```

## Build (igual ao Actions)

```bash
PAYLOAD_URL=https://painel.estudiosites.com.br SITE_TENANT=demo pnpm build
```

O workflow `publicar-site-git.yml` do monorepo clona o repo do cliente, roda `pnpm build` e `wrangler deploy --name site-<slug>`.
