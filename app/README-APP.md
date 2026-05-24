# GitHub Developer Analytics

A beautiful web application that analyzes GitHub developers using the public GitHub API and Azure OpenAI to generate insightful, humorous assessments of their development style.

## Features

- 🔍 Search any public GitHub developer by username
- 📊 Beautiful dashboard showing contribution metrics
- 💻 Language statistics with interactive charts  
- 🤖 AI-powered personality assessment powered by Azure OpenAI
- ⚡ Instant deployment to Azure Static Web Apps
- 🎨 GitHub-themed dark UI built with Tailwind CSS

## Project Structure

```
coreybarr/
├── src/                           # Angular SPA
│   ├── app/
│   │   ├── core/                 # Tokens, interceptors
│   │   ├── domain/               # Models, transformers
│   │   ├── infrastructure/       # Repositories
│   │   ├── shared/               # Reusable components
│   │   └── features/             # Search, Dashboard, AI
│   └── environments/             # Config
├── api/                          # Azure Functions backend
│   └── analyze/                  # AI summary endpoint
├── infra/                        # Bicep IaC
└── [config files]
```

## Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- npm or yarn
- (Optional) Azure CLI for deployment
- (Optional) Azure subscription with OpenAI resource

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   cd api && npm install && cd ..
   ```

2. **Set environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit with your Azure OpenAI credentials
   ```

3. **Start local dev servers:**
   ```bash
   # Terminal 1: Angular dev server
   npm start
   # Runs on http://localhost:4200
   
   # Terminal 2: Azure Functions emulator
   cd api
   npm run build
   func start
   # Runs on http://localhost:7071
   ```

4. **Open browser:**
   Navigate to `http://localhost:4200` and search for a GitHub developer!

## Deployment to Azure

### Prerequisites

- Azure subscription
- Azure OpenAI resource provisioned with `gpt-4o-mini` model deployment
- Azure Developer CLI (`azd`) installed

### Deploy with `azd up`

```bash
# Login to Azure
az login

# Set subscription
az account set --subscription <YOUR_SUBSCRIPTION_ID>

# Deploy everything
azd up

# Follow prompts for resource group, region, and OpenAI configuration
```

This will:
1. Create a resource group
2. Provision Azure Static Web Apps (free tier)
3. Provision Azure OpenAI (S0 tier)
4. Deploy the Angular app and Functions
5. Configure GitHub Actions for CI/CD
6. Output live URL

### Environment Variables

Create `.env` with:

```bash
AZURE_OPENAI_ENDPOINT=https://<your-openai>.openai.azure.com/
AZURE_OPENAI_API_KEY=<your-api-key>
AZURE_OPENAI_DEPLOYMENT_ID=gpt-4o-mini
```

## Architecture

### Frontend (Angular 19)
- **Feature-based structure** with smart/dumb component separation
- **Signals** for reactive state management  
- **Injection tokens** for testable, decoupled services
- **Pure domain transformers** for business logic
- **Tailwind CSS** for GitHub-themed styling

### Backend (Azure Functions)
- Single `/api/analyze` endpoint
- Receives GitHub data, calls Azure OpenAI
- Returns humorous developer assessment
- Runs in managed Azure Functions (included in Static Web Apps)

### Infrastructure (Bicep)
- Azure Static Web Apps (free tier) for frontend + Functions
- Azure OpenAI (S0) with gpt-4o-mini deployment
- All infrastructure-as-code, deployable in one command

## API Endpoints

### GET /
Angular SPA

### POST /api/analyze
Analyzes GitHub developer data and generates AI summary.

**Request:**
```json
{
  "user": { "login": "...", "followers": 123, ... },
  "repos": [ { "name": "...", "language": "...", ... } ],
  "activity": { "total_contributions": 456, ... },
  "languages": [ { "name": "TypeScript", "percentage": 45 } ]
}
```

**Response:**
```json
{
  "summary": "A witty, insightful assessment of the developer...",
  "generated_at": "2026-05-20T10:30:00Z"
}
```

## Rate Limits

- **GitHub API:** 60 requests/hour (unauthenticated)
- **Azure OpenAI:** Depends on quota (typically unlimited for POC)

For higher limits, add a GitHub Personal Access Token in the environment.

## Troubleshooting

**"GitHub user not found"**
- Ensure the username is correct and the profile is public

**"Rate limit exceeded"**
- GitHub API limit reached. Authenticated requests get higher limits.
- Wait 1 hour for unauthenticated limit to reset.

**AI summary not appearing**
- Check Azure OpenAI is provisioned and credentials are set
- Check browser DevTools for `/api/analyze` error response

**Build fails**
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Performance

- **Search latency:** ~2-3 seconds for GitHub data
- **AI summary latency:** +2-4 seconds (first call may be slower - cold start)
- **Page load:** <1 second (SPA cached, CDN distributed)

## Testing

```bash
# Unit tests
npm test

# E2E (optional, requires Playwright)
npm run e2e
```

## Future Enhancements

- [ ] Multiple AI personas (council mode)
- [ ] GitHub auth for higher rate limits
- [ ] Contribution heatmap visualization
- [ ] Developer comparison tool
- [ ] Share profiles via unique URLs
- [ ] Dark/light mode toggle
- [ ] Export reports as PDF

## License

MIT

## Author

Built during a 2-hour hackathon 🚀
