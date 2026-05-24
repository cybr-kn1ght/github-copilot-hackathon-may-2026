import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { AnalyticsPanelComponent } from './analytics-panel/analytics-panel.component';
import { AiPersonaComponent } from './ai-persona/ai-persona.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { DashboardFacade } from './dashboard.facade';
import { GITHUB_REPOSITORY, AI_REPOSITORY } from '../../core/tokens/repository.tokens';
import { GitHubRepository } from '../../infrastructure/github.repository';
import { AiRepository } from '../../infrastructure/ai.repository';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProfileCardComponent,
    AnalyticsPanelComponent,
    AiPersonaComponent,
    SkeletonLoaderComponent,
  ],
  providers: [
    DashboardFacade,
    { provide: GITHUB_REPOSITORY, useClass: GitHubRepository },
    { provide: AI_REPOSITORY, useClass: AiRepository },
  ],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Back Button -->
      <button
        (click)="goBack()"
        class="button-ghost mb-6 flex items-center gap-2"
      >
        ← Back to Search
      </button>

      <!-- Error State -->
      <div *ngIf="state().error" class="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400 mb-6">
        {{ state().error }}
      </div>

      <!-- Loading State -->
      <div *ngIf="state().loading" class="space-y-8">
        <app-skeleton-loader [rows]="4"></app-skeleton-loader>
        <app-skeleton-loader [rows]="3"></app-skeleton-loader>
      </div>

      <!-- Loaded State -->
      <div *ngIf="!state().loading && state().user" class="space-y-8 animate-fade-in">
        <!-- Profile Card -->
        <app-profile-card [user]="state().user"></app-profile-card>

        <!-- Analytics -->
        <app-analytics-panel
          [activity]="state().activity"
          [languages]="state().languages"
          [topRepos]="state().topRepos"
        ></app-analytics-panel>

        <!-- AI Persona -->
        <app-ai-persona [summary]="state().summary"></app-ai-persona>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  state = this.facade.state;

  constructor(
    private facade: DashboardFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const username = params['username'];
      if (username) {
        this.facade.loadDeveloper(username);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
