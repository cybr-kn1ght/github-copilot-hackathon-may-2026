#!/bin/bash

# Deployment script for GitHub Analytics
set -e

SUBSCRIPTION_ID="eaa25043-05d8-4320-a858-ae0c551b3ccb"
RESOURCE_GROUP="corey-barr-hackathon-2026"
RG_REGION="australiaeast"
DEPLOY_REGION="centralus"
OPENAI_REGION="australiaeast"
OPENAI_DEPLOYMENT_ID="gpt-4o-mini"
APP_NAME="devmetrics-coreybarr"
REPOSITORY_URL="https://github.com/coreybarr/coreybarr"

echo "🚀 GitHub Developer Analytics - Azure Deployment"
echo "=================================================="
echo ""
echo "Subscription: $SUBSCRIPTION_ID"
echo "Resource Group: $RESOURCE_GROUP"
echo "Resource Group Region: $RG_REGION"
echo "Deployment Region: $DEPLOY_REGION"
echo "Azure OpenAI Region: $OPENAI_REGION"
echo "Azure OpenAI Deployment ID: $OPENAI_DEPLOYMENT_ID"
echo "App Name: $APP_NAME"
echo ""

# Set subscription
echo "1️⃣  Setting Azure subscription..."
az account set --subscription "$SUBSCRIPTION_ID"

# Create resource group
echo "2️⃣  Creating resource group..."
EXISTING_RG_LOCATION=$(az group show --name "$RESOURCE_GROUP" --query "location" -o tsv 2>/dev/null || true)
if [ -n "$EXISTING_RG_LOCATION" ]; then
  echo "ℹ️  Resource group already exists in $EXISTING_RG_LOCATION"
else
  az group create --name "$RESOURCE_GROUP" --location "$RG_REGION"
fi

# Build the app
echo "3️⃣  Building Angular app..."
npm run build:app

# Build the API
echo "4️⃣  Building Azure Functions API..."
npm run build:api

# Deploy infrastructure
echo "5️⃣  Deploying to Azure Static Web Apps..."
az deployment group create \
  --resource-group "$RESOURCE_GROUP" \
  --template-file infra/main.bicep \
  --parameters infra/main.parameters.json \
  --parameters location="$DEPLOY_REGION" appName="$APP_NAME" repositoryUrl="$REPOSITORY_URL" openAiLocation="$OPENAI_REGION" openAiDeploymentId="$OPENAI_DEPLOYMENT_ID"

# Get the Static Web App resource
echo "6️⃣  Retrieving deployment details..."
SWA_NAME=$(az resource list --resource-group "$RESOURCE_GROUP" --resource-type "Microsoft.Web/staticSites" --query "[0].name" -o tsv)

if [ -z "$SWA_NAME" ]; then
  echo "❌ Error: Static Web App not found"
  exit 1
fi

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📱 Your app is deployed at: https://${SWA_NAME}.azurestaticapps.net"
echo ""
echo "📝 Next steps:"
echo "  1. Test the app by searching for a GitHub developer"
echo "  2. The AI assessment now uses Azure OpenAI when deployment exists"
echo "  3. If model deployment is missing, create '$OPENAI_DEPLOYMENT_ID' in Azure AI Foundry"
echo ""
