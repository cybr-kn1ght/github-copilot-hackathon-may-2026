import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbbreviateNumberPipe } from '../../../shared/pipes/abbreviate.pipe';
import { GitHubUser } from '../../../domain/models/github.model';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, AbbreviateNumberPipe],
  template: `
    <div class="card">
      <div class="flex gap-6 items-start">
        <img [src]="user!.avatar_url" [alt]="user!.login" class="w-24 h-24 rounded-full" />
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gh-text">{{ user!.name || user!.login }}</h2>
          <p class="text-gh-muted text-sm">&#64;{{ user!.login }}</p>
          <p *ngIf="user!.bio" class="text-gh-text mt-2">{{ user!.bio }}</p>

          <div class="flex flex-wrap gap-4 mt-4">
            <div class="stat-badge">
              <span class="font-semibold text-gh-blue">{{ user!.followers | abbreviate }}</span>
              <span>followers</span>
            </div>
            <div class="stat-badge">
              <span class="font-semibold text-gh-blue">{{ user!.following | abbreviate }}</span>
              <span>following</span>
            </div>
            <div class="stat-badge">
              <span class="font-semibold text-gh-blue">{{ user!.public_repos | abbreviate }}</span>
              <span>repos</span>
            </div>
          </div>

          <div *ngIf="user!.company || user!.location || user!.blog" class="flex flex-wrap gap-4 mt-4 text-sm text-gh-muted">
            <span *ngIf="user!.company">📍 {{ user!.company }}</span>
            <span *ngIf="user!.location">🗺️ {{ user!.location }}</span>
            <a *ngIf="user!.blog" [href]="user!.blog" target="_blank" class="text-gh-blue hover:underline">🔗 {{ user!.blog }}</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProfileCardComponent {
  @Input() user: GitHubUser | null = null;
}
