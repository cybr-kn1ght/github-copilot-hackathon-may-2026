# Phase 0 - Setup (Before Hackathon Begins)

- [ ] Login to GitHub + Copilot
- [ ] Confirm Azure access works
- [ ] Open
    - [ ] Copilot Chat
    - [ ] Browser tab for Azure portal
    - [ ] Code Editor (Neovim)

---

# Phase 1 - Understanding & Framing The Problem (No Code)

- [ ] Clarify the challenge

```
Summarise this problem and identify:
- Core objective
- Key constraints
- Opportunities for AI/agentic solutions
- Hidden complexity

[PASTE CHALLENGE]
```

- [ ] Generate three solution approaches for the problem

```
Generate 3 different solution approaches for this problem.

For each:
- Architecture idea
- Where AI/agents can be used
- Complexity level
- Why it would impress judges
```

- [ ] Choose the solution that uses agents, Azure, and is demoable in ~2 hours

---

# Phase 2 - Architecture Design (No Code)

- [ ] Design the solution architecture

```
You are a cloud solution architect and AI engineer.

Design an agentic system for this problem:

[SELECTED IDEA]

Requirements:
- Modular agents
- Clear responsibilities
- Azure-native services
- Scalable and observable

Output:
1. Architecture
2. Data flow
3. Azure services
4. Risks
```

- [ ] Refine the solution architecture

```
Improve this architecture for:
- Simplicity (hackathon-friendly)
- Speed of implementation
- Demo impact

Remove unnecessary complexity but keep it impressive
```

---

# Phase 3 - Project Scaffold (Code Time)

- [ ] Generate project structure

```
Create a production-ready scaffold:

App: [your system]
Tech: [Angular, .Net, etc.]
Cloud: Azure

Include:
- Folder structure
- Core modules (agents, orchestration, API)
- Basic working app

Constraint:
- Minimal API endpoint 
- 2–3 agents 
- Mock data if needed 
```

---

# Phase 4 - Build Core Functionality

- [ ] Build agents that are each responsible for only one component of the solution

```
Build an agent:

Name: [agent]
Responsibility: [task]

Requirements:
- Simple but functional
- Error handling
- Logging

Output code + explanation
```

- [ ] Build an Orchestrator to compose the different agent components

```
Create an orchestration layer:

Agents:
- A
- B
- C

Requirements:
- Sequential workflow
- Retry on failure
- Logging

Prefer Azure Durable Functions or simple orchestrator
```

- [ ] Connect everything

```
Integrate all components into a working flow.

Ensure:
- Data moves correctly between agents
- System can be demoed end-to-end
```

---

# Phase 5 - Azure Integration (Make It Cloud-Native)

- [ ] Integrate app with Azure

```
Integrate this app with Azure.

Use:
- One compute service (Functions/App Service)
- One storage service
- Optional: Azure OpenAI

Include:
- Setup steps
- Code changes
- Minimal config
```

---

# Phase 6 - Polish

- [ ] Improve UX / Demo

```
Enhance this for a hackathon demo:

Focus:
- Simplicity
- Visual output
- Fast interaction

Add:
- Sample inputs
- Clear outputs
```

- [ ] Add AI hook

```
Add a smart AI feature to impress judges.

Examples:
- Auto-summarisation
- Decision-making agent
- Insight generation

Keep it simple but impactful
```

- [ ] Generate Pitch

```
Explain this project as a hackathon winning pitch.

Include:
- Problem
- Solution
- Architecture
- AI usage
- Why it's impressive
```

---

# Phase 7 - Demo Strategy

Structure the demo:

1. Problem (10 seconds)
2. Solution (20 seconds)
3. Architecture (20 seconds)
4. Live demo (60 seconds)
5. Why it’s cool (10 seconds)
