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

Adds "wow factor"

- AI summarisation
- Insights
- Recommendations

Example:
- Suggested next steps
- Confidence score

