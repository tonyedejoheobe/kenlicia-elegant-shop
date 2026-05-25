# Cloudflare Workers Deployment Guide

This project is configured for **Cloudflare Workers** (with Pages integration) for easy deployment with full server-side rendering support.

## Prerequisites

1. **Cloudflare Account** - Sign up at https://dash.cloudflare.com
2. **Wrangler CLI** - Already configured in your project

## Option 1: Deploy via GitHub (Recommended - Automatic)

### Setup with Cloudflare Pages + Workers:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/client`
5. Set environment variables if needed (Supabase, etc.)
6. **Deploy**

Every push to `main` will auto-deploy!

## Option 2: Quick Manual Deployment (One Command)

```bash
# Install Wrangler globally
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login

# Build and deploy
npm run build
wrangler deploy
```

That's it! Your site is live at `https://kenlicia-elegant-shop.pages.dev` ✅

## Option 3: Deploy Just the Built Files

```bash
# Build the project
npm run build

# Deploy the server to Cloudflare Workers
wrangler deploy --name kenlicia-elegant-shop
```

## Environment Variables

If you need environment variables (Supabase, API keys, etc.):

### Via Wrangler CLI:
```bash
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_ANON_KEY
```

### Or in Cloudflare Dashboard:
1. Workers & Pages → Your project
2. **Settings** → **Environment variables**
3. Add your variables

## How It Works

- **`src/server.ts`** - Handles requests on Cloudflare Workers
- **`dist/client/`** - Static assets (CSS, JS, images)
- **`dist/server/`** - Compiled server code
- **`wrangler.jsonc`** - Configuration for Workers deployment

## Custom Domain

1. Go to your Cloudflare Pages project
2. **Settings** → **Custom domains**
3. Add your domain (e.g., `kenlicia.com`)
4. Point your domain's nameservers to Cloudflare

## Troubleshooting

**Still getting 404?**
- Run: `wrangler deploy` (full rebuild and deploy)
- Check console: `wrangler tail` (see live logs)

**Want to see deployment logs?**
```bash
wrangler tail
```

**Deploy just the client files to Pages:**
```bash
wrangler pages deploy dist/client
```

## Resources

- [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [TanStack Start](https://tanstack.com/start/latest)
