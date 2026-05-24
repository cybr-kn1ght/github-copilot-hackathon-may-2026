import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityStats, DeveloperSummary, GitHubUser, LanguageStat, RepoStats } from '../../domain/models/github.model';
import { GitHubEvent } from '../../domain/transformers/activity.transformer';

export interface AnalyzeDeveloperPayload {
  user: {
    login: string;
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
  };
  repos: RepoStats[];
  activity: ActivityStats;
  languages: LanguageStat[];
}

export interface IGitHubRepository {
  getUser(username: string): Observable<GitHubUser>;
  getRepos(username: string): Observable<RepoStats[]>;
  getEvents(username: string): Observable<GitHubEvent[]>;
}

export interface IAiRepository {
  analyzeDeveloper(data: AnalyzeDeveloperPayload): Observable<DeveloperSummary>;
}

export const GITHUB_REPOSITORY = new InjectionToken<IGitHubRepository>('GitHubRepository');
export const AI_REPOSITORY = new InjectionToken<IAiRepository>('AiRepository');
