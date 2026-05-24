import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { AbbreviateNumberPipe } from '../../../shared/pipes/abbreviate.pipe';
import { ActivityStats, LanguageStat, RepoStats } from '../../../domain/models/github.model';

@Component({
  selector: 'app-analytics-panel',
  standalone: true,
  imports: [CommonModule, AbbreviateNumberPipe],
  template: `
    <div class="space-y-6">
      <!-- Language Chart -->
      <div class="card">
        <h3 class="text-lg font-bold mb-4 text-gh-text">Top Languages</h3>
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="lg:w-1/2">
            <canvas #languageChart></canvas>
          </div>
          <div class="lg:w-1/2">
            <div class="space-y-2">
              <div *ngFor="let lang of languages" class="flex items-center justify-between p-2 hover:bg-gh-bg rounded">
                <span class="text-gh-text">{{ lang.name }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-gh-bg rounded-full overflow-hidden">
                    <div class="h-full bg-gh-blue" [style.width.%]="lang.percentage"></div>
                  </div>
                  <span class="text-gh-muted text-sm w-10 text-right">{{ lang.percentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Repos -->
      <div class="card">
        <h3 class="text-lg font-bold mb-4 text-gh-text">Top Repositories</h3>
        <div class="space-y-3">
          <div *ngFor="let repo of topRepos" class="p-3 border border-gh-border rounded hover:bg-gh-bg transition-colors">
            <a [href]="repo.url" target="_blank" class="font-semibold text-gh-blue hover:underline">
              {{ repo.name }}
            </a>
            <p *ngIf="repo.description" class="text-sm text-gh-muted mt-1">{{ repo.description | slice: 0: 100 }}</p>
            <div class="flex gap-4 mt-2 text-xs text-gh-muted">
              <span>⭐ {{ repo.stars | abbreviate }}</span>
              <span>🍴 {{ repo.forks | abbreviate }}</span>
              <span *ngIf="repo.language">{{ repo.language }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AnalyticsPanelComponent implements AfterViewInit {
  @Input() activity: ActivityStats | null = null;
  @Input() languages: LanguageStat[] = [];
  @Input() topRepos: RepoStats[] = [];

  @ViewChild('languageChart') chartRef?: ElementRef;
  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    this.drawChart();
  }

  private drawChart(): void {
    if (!this.chartRef || !this.languages.length) return;

    const ctx = this.chartRef.nativeElement.getContext('2d');
    const colors = [
      '#58a6ff',
      '#bc8cff',
      '#e3b341',
      '#3fb950',
      '#f85149',
      '#ff7b72',
      '#ffa657',
      '#79c0ff',
    ];

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.languages.map((l) => l.name),
        datasets: [
          {
            data: this.languages.map((l) => l.percentage),
            backgroundColor: colors.slice(0, this.languages.length),
            borderColor: '#161b22',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
