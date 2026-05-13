# Core Agentic Flow

Accept Input -> Process Via Specialised Agents -> Orchestrate -> Return Encriched Output

# Component Architecture

```
[ Client / Input ]
        ↓
[ API Layer ]
        ↓
[ Orchestrator ]
   ↓    ↓    ↓
[Agent][Agent][Agent]
        ↓
[ Storage / AI / External ]
        ↓
[ Response Builder ]
        ↓
[ Output ]
```

# Default Agents

## 1. Ingestion Agent

Understands the input.

- Parses requests
- Validates input
- Cleans / transforms the input data

Example:
User Input -> Structured JSON

## 2. Classification / Decision Agent

Decides what to do based on structured data.

- Categorises requests
- Chooses workflow path

## 3. Processing Agent

Does the main work.

- Business logic
- Transformation
- API / AI calls

Example:
- Generate response
- Calculate results
- Retrieve data

## 4. Enrichment Agent

Adds "wow factor".

- AI summarisation
- Insights
- Recommendations

Example:
- Suggested next steps
- Confidence score

## 5. Response Agent

Formats output.

- Combines results
- Makes output demo-friendly 
- Adds structure / logging

# Orchestrator Pattern 

Composes different agents together.

Agent A -> Agent B -> Agent C -> Response

- Log each agent step
- Track decisions
- Show flows in output

# Azure Mapping

- API Layer: Azure Function (HTTP trigger)
- Orchestrator: Function code OR Durable Functions
- Agents: Separate modules / functions
- Storage: Table storage / Cosmos DB
- AI: Azure OpenAI

# Folder Structure

```
/app
  /api
  /orchestrator
  /agents
    ingestion_agent
    classification_agent
    processing_agent
    enrichment_agent
    response_agent
  /services
  /models
  /utils
```

# Data Flow Template

```
Request
 → Parsed Input
 → Classified Intent
 → Processed Result
 → Enriched Output
 → Final Response
```

# Output For Demo 

```
=== Agent Workflow ===

[Ingestion Agent]
- Parsed input successfully

[Classifier Agent]
- Category: High Priority

[Processing Agent]
- Assigned to: Team A

[Enrichment Agent]
- Suggested: Escalation recommended

=== Final Result ===
Task assigned with recommendation
```
