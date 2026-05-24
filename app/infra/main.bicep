param location string = resourceGroup().location
param appName string = 'github-analytics-${uniqueString(resourceGroup().id)}'
param environmentName string = 'poc'
param repositoryUrl string = 'https://github.com/coreybarr/coreybarr'
param openAiLocation string = resourceGroup().location
param openAiName string = 'ghanalytics-${uniqueString(resourceGroup().id)}'
param openAiDeploymentId string = 'gpt-4o-mini'
param openAiModelName string = 'gpt-4o-mini'
param openAiModelVersion string = '2024-07-18'
param openAiDeploymentSkuName string = 'GlobalStandard'
param openAiDeploymentSkuCapacity int = 1

resource openAi 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: openAiName
  location: openAiLocation
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: openAiName
    publicNetworkAccess: 'Enabled'
  }
}

resource openAiModelDeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  name: '${openAi.name}/${openAiDeploymentId}'
  sku: {
    name: openAiDeploymentSkuName
    capacity: openAiDeploymentSkuCapacity
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: openAiModelName
      version: openAiModelVersion
    }
    raiPolicyName: 'Microsoft.DefaultV2'
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
  }
}

// Static Web App
resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: appName
  location: location
  tags: {
    environment: environmentName
    project: 'github-analytics'
  }
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: 'main'
    buildProperties: {
      appLocation: ''
      apiLocation: 'api'
      outputLocation: 'dist/github-analytics'
    }
  }
}

resource staticWebAppAppSettings 'Microsoft.Web/staticSites/config@2022-03-01' = {
  name: '${staticWebApp.name}/appsettings'
  properties: {
    AZURE_OPENAI_ENDPOINT: 'https://${openAiName}.openai.azure.com/'
    AZURE_OPENAI_API_KEY: listKeys(openAi.id, '2023-05-01').key1
    AZURE_OPENAI_DEPLOYMENT_ID: openAiDeploymentId
    AZURE_OPENAI_API_VERSION: '2024-10-21'
  }
}

output staticWebAppUrl string = 'https://${staticWebApp.properties.defaultHostname}'
output openAiEndpoint string = 'https://${openAiName}.openai.azure.com/'
output openAiResourceName string = openAi.name

