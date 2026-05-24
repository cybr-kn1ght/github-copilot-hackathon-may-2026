import { ActivityStats } from '../models/github.model';

export interface GitHubEvent {
  type: string;
  created_at: string;
  payload?: {
    action?: string;
    size?: number;
    commits?: Array<{ sha: string }>;
    pull_request?: any;
    issue?: any;
  };
}

export function computeActivityStats(events: GitHubEvent[]): ActivityStats {
  const last90Days = new Date();
  last90Days.setDate(last90Days.getDate() - 90);

  const recentEvents = events.filter((e) => new Date(e.created_at) > last90Days);

  let commits = 0;
  let pull_requests = 0;
  let issues_opened = 0;
  let code_reviews = 0;

  recentEvents.forEach((event) => {
    switch (event.type) {
      case 'PushEvent':
        commits += event.payload?.size ?? event.payload?.commits?.length ?? 0;
        break;
      case 'PullRequestEvent':
        if (event.payload?.action === 'opened') pull_requests++;
        break;
      case 'IssuesEvent':
        if (event.payload?.action === 'opened') issues_opened++;
        break;
      case 'PullRequestReviewEvent':
        code_reviews++;
        break;
    }
  });

  const total_contributions = commits + pull_requests + issues_opened + code_reviews;

  return {
    total_contributions,
    commits,
    pull_requests,
    issues_opened,
    code_reviews,
    contribution_streak: 0, // Simplified for POC
  };
}
