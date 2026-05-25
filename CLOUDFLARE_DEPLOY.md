# Cloudflare Pages Deployment Guide

This project is configured for easy deployment to **Cloudflare Pages**.

## Prerequisites

1. **Cloudflare Account** - Sign up at https://dash.cloudflare.com
2. **Wrangler CLI** - Already configured in your project
3. **GitHub Account** - Your repository should be pushed to GitHub

## Option 1: Automatic Deployment (Recommended - CI/CD)

### Setup GitHub Integration:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages**
3. Click **Create a project** → **Connect to Git**
4. Authorize GitHub and select your `kenlicia-elegant-shop` repository
5. Configure build settings:
   - **Framework preset**: Leave as "None" (it will auto-detect)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/client`
   - **Environment variables**: Add any needed (e.g., `SUPABASE_URL`, `SUPABASE_ANON_KEY`)

6. Click **Deploy**
7. Every time you push to `main` branch, it will automatically deploy!

## Option 2: Manual Deployment (One-time)

### Using Wrangler CLI:

```bash
# Install Wrangler globally (if not already installed)
npm install -g wrangler

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist/client
```

Follow the prompts:
- Select or create a project name
- Confirm the `dist/client` directory
- Done! Your site is live

## Option 3: Using GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      
      - run: npm install
      - run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: kenlicia-elegant-shop
          directory: dist/client
          productionBranch: main
```

## Environment Variables

If your project uses environment variables (Supabase, API keys, etc.):

### In Cloudflare Pages Dashboard:
1. Go to your Pages project
2. **Settings** → **Environment variables**
3. Add your variables for both **Production** and **Preview** environments

Example:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

## Configuration Files

- **wrangler.jsonc** - Cloudflare Workers configuration (already set up)
- **package.json** - Build scripts are configured
- **vite.config.ts** - Uses `@lovable.dev/vite-tanstack-config`

## Troubleshooting

**Issue: Build fails**
- Check that `npm run build` works locally
- Verify Node.js version is 20+
- Check environment variables are set

**Issue: Routes not working (404 errors)**
- Ensure `dist/client` is the output directory
- Pages will automatically handle client-side routing

**Issue: Server-side rendering not working**
- Cloudflare Pages automatically handles SSR through the built dist/server code
- No additional setup needed

## Custom Domain

1. In Cloudflare Pages project **Settings**
2. **Custom domains** → **Set up a custom domain**
3. Follow Cloudflare's instructions to point your domain

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [TanStack Start Docs](https://tanstack.com/start/latest)
