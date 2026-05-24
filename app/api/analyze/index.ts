interface AnalyzeUser {
  login: string;
  followers: number;
  name?: string | null;
  bio?: string | null;
}

interface AnalyzeActivity {
  total_contributions: number;
  commits: number;
  pull_requests: number;
}

interface AnalyzeLanguage {
  name: string;
}

interface AnalyzeRepo {
  name: string;
}

interface AnalyzeRequestBody {
  user?: AnalyzeUser;
  repos?: AnalyzeRepo[];
  activity?: AnalyzeActivity;
  languages?: AnalyzeLanguage[];
}

interface LegacyHttpRequest {
  body?: AnalyzeRequestBody | null;
}

interface LegacyContext {
  log: (...args: unknown[]) => void;
  res?: {
    status: number;
    body: unknown;
  };
}

const httpTrigger = async function (context: LegacyContext, req: LegacyHttpRequest): Promise<void> {
  try {
    const body = req.body ?? {};
    const user = body.user;
    const repos = body.repos ?? [];
    const activity = body.activity;
    const languages = body.languages ?? [];

    if (!user || !activity) {
      context.res = {
        status: 400,
        body: { error: 'Missing required fields' },
      };
      return;
    }

    // Keep deployment resilient: use Azure OpenAI when configured, otherwise return mock text.
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const deploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_ID || 'gpt-4o-mini';

    if (endpoint && apiKey) {
      try {
        const summary = await generateAiSummary({ endpoint, apiKey, deploymentId, user, repos, activity, languages });
        context.res = {
          status: 200,
          body: {
            summary,
            generated_at: new Date().toISOString(),
            mock: false,
            repo_count: repos.length,
          },
        };
        return;
      } catch (aiError) {
        context.log('Azure OpenAI call failed, falling back to mock summary:', aiError);
      }
    }

    const mockSummary = getMockAssessment(user, activity, languages);
    context.res = {
      status: 200,
      body: {
        summary: mockSummary,
        generated_at: new Date().toISOString(),
        mock: true,
        repo_count: repos.length,
      },
    };
  } catch (error) {
    context.log('Error in analyze function:', error);
    context.res = {
      status: 500,
      body: { error: 'Failed to generate summary' },
    };
  }
};

interface AiSummaryInput {
  endpoint: string;
  apiKey: string;
  deploymentId: string;
  user: AnalyzeUser;
  repos: AnalyzeRepo[];
  activity: AnalyzeActivity;
  languages: AnalyzeLanguage[];
}

async function generateAiSummary(input: AiSummaryInput): Promise<string> {
  const prompt = buildPrompt(input.user, input.repos, input.activity, input.languages);
  const endpoint = input.endpoint.replace(/\/+$/, '');
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-10-21';
  const url = `${endpoint}/openai/deployments/${input.deploymentId}/chat/completions?api-version=${apiVersion}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': input.apiKey,
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content:
            'You are a witty and encouraging engineering lead. Return a short 2-3 sentence GitHub developer assessment focused on strengths and style.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 220,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Azure OpenAI HTTP ${response.status}: ${text}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const summary = data.choices?.[0]?.message?.content?.trim();

  if (!summary) {
    throw new Error('Azure OpenAI returned an empty summary');
  }

  return summary;
}

function buildPrompt(user: AnalyzeUser, repos: AnalyzeRepo[], activity: AnalyzeActivity, languages: AnalyzeLanguage[]): string {
  const topLanguages = languages
    .slice(0, 3)
    .map((l) => l.name)
    .join(', ');

  return [
    `Developer: ${user.login}`,
    `Followers: ${user.followers}`,
    `Public repos in payload: ${repos.length}`,
    `Recent contributions: ${activity.total_contributions}`,
    `Recent commits: ${activity.commits}`,
    `Recent PRs opened: ${activity.pull_requests}`,
    `Top languages: ${topLanguages || 'Unknown'}`,
    'Write a concise summary that sounds insightful and a little playful.',
  ].join('\n');
}

function getMockAssessment(user: AnalyzeUser, activity: AnalyzeActivity, languages: AnalyzeLanguage[]): string {
  const login = user.login;
  const followers = user.followers;
  const commits = activity.commits;
  const topLang = languages[0]?.name || 'code';

  const assessments = [
    `🚀 ${login} is a coding force of nature with ${followers} followers cheering them on. With ${commits} commits in the last 90 days, they are clearly not afraid of the keyboard. Probably spends free time debating tabs vs spaces over ${topLang}.`,
    `💻 Meet ${login} - the kind of developer who gets things done. ${followers} people are watching their GitHub for a reason. Their recent activity shows someone serious about shipping code and learning on the go.`,
    `🎯 ${login} is out here making it happen. With ${commits} commits under their belt, they are proving that consistency beats perfection. The community clearly loves what they do - ${followers} followers and counting.`,
    `⚡ Behold ${login}: a developer who codes in ${topLang} and dreams in pull requests. ${commits} commits and ${followers} followers say they are doing something right.`,
  ];

  return assessments[Math.floor(Math.random() * assessments.length)];
}

export default httpTrigger;