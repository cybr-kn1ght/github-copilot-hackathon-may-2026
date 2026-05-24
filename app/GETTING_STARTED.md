# Quick Start Guide

## For Local Development

### 1. Install Dependencies
```bash
npm install
cd api && npm install && cd ..
```

### 2. Set Up Environment
```bash
cp .env.example .env.local
# Edit .env.local with your Azure OpenAI credentials
```

### 3. Start Development Servers

**Terminal 1 - Angular:**
```bash
npm start
```
Opens http://localhost:4200

**Terminal 2 - Azure Functions:**
```bash
cd api
npm run build
func start
```
Runs on http://localhost:7071

## For Azure Deployment

### 1. Prerequisites
- Azure subscription
- Azure OpenAI resource (gpt-4o-mini deployment)
- `azd` CLI installed

### 2. Deploy
```bash
az login
az account set --subscription <YOUR_SUBSCRIPTION_ID>
azd up
```

Follow the prompts to complete deployment.

## First Run

1. Go to search page
2. Enter a GitHub username (e.g., `torvalds`, `gvanrossum`)
3. See beautiful stats and AI assessment
4. Click "Back to Search" to try another developer

## Troubleshooting

**Port 4200 already in use?**
```bash
ng serve --port 4300
```

**"Cannot find module" errors?**
```bash
rm -rf node_modules api/node_modules
npm install
cd api && npm install && cd ..
```

**Need more help?** See README-APP.md for full documentation.
