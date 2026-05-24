import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-gh-bg via-gh-surface to-gh-bg flex items-center justify-center px-4">
      <div class="max-w-2xl w-full">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-gradient mb-4">DevMetrics</h1>
          <p class="text-gh-muted text-lg">Discover insights about GitHub developers</p>
        </div>

        <form (ngSubmit)="onSearch()" class="card p-8">
          <div class="space-y-4">
            <label class="block">
              <p class="text-gh-text font-medium mb-2">GitHub Username</p>
              <input
                [(ngModel)]="username"
                name="username"
                type="text"
                placeholder="e.g., torvalds, gvanrossum"
                class="input"
                (keydown.enter)="onSearch()"
              />
            </label>
            <button type="submit" class="button-primary w-full" [disabled]="loading">
              {{ loading ? 'Searching...' : 'Search Developer' }}
            </button>
          </div>
        </form>

        <div *ngIf="error" class="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-400">
          {{ error }}
        </div>
      </div>
    </div>
  `,
})
export class SearchComponent {
  username: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    if (!this.username.trim()) {
      this.error = 'Please enter a username';
      return;
    }

    this.loading = true;
    this.error = '';
    this.router.navigate(['/dashboard', this.username.trim()]);
  }
}
