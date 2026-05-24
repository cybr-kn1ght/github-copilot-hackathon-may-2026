import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeveloperSummary } from '../domain/models/github.model';
import { AnalyzeDeveloperPayload, IAiRepository } from '../core/tokens/repository.tokens';

@Injectable({ providedIn: 'root' })
export class AiRepository implements IAiRepository {
  constructor(private http: HttpClient) {}

  analyzeDeveloper(data: AnalyzeDeveloperPayload): Observable<DeveloperSummary> {
    return this.http.post<DeveloperSummary>('/api/analyze', {
      user: data.user,
      repos: data.repos,
      activity: data.activity,
      languages: data.languages,
    });
  }
}
