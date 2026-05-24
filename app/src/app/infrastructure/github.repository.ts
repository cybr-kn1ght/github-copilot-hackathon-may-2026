import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GitHubUser, RepoStats } from '../domain/models/github.model';
import { IGitHubRepository } from '../core/tokens/repository.tokens';
import { GitHubEvent } from '../domain/transformers/activity.transformer';

@Injectable({ providedIn: 'root' })
export class GitHubRepository implements IGitHubRepository {
  private readonly API_BASE = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`${this.API_BASE}/users/${username}`);
  }

  getRepos(username: string): Observable<RepoStats[]> {
    return this.http
      .get<any[]>(`${this.API_BASE}/users/${username}/repos?per_page=100&sort=updated`)
      .pipe(
        map((repos) =>
          repos.map((r) => ({
            name: r.name,
            description: r.description,
            url: r.html_url,
            language: r.language,
            stars: r.stargazers_count,
            forks: r.forks_count,
            updated_at: r.updated_at,
          }))
        )
      );
  }

  getEvents(username: string): Observable<GitHubEvent[]> {
    return this.http.get<any[]>(`${this.API_BASE}/users/${username}/events?per_page=100`).pipe(
      map((events) =>
        events.map((e) => ({
          type: e.type,
          created_at: e.created_at,
          payload: e.payload,
        }))
      )
    );
  }
}
