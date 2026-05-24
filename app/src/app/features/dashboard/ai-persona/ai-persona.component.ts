import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechBubbleComponent } from '../../../shared/components/speech-bubble/speech-bubble.component';
import { SkeletonLoaderComponent } from '../../../shared/components/skeleton-loader/skeleton-loader.component';
import { DeveloperSummary } from '../../../domain/models/github.model';

@Component({
  selector: 'app-ai-persona',
  standalone: true,
  imports: [CommonModule, SpeechBubbleComponent, SkeletonLoaderComponent],
  template: `
    <div class="card">
      <h3 class="text-lg font-bold mb-4 text-gh-text">DevMetrics AI Assessment</h3>
      <app-skeleton-loader [show]="!summary" [rows]="3"></app-skeleton-loader>
      <app-speech-bubble
        *ngIf="summary"
        personaName="DevMetrics AI"
        [text]="summary.summary"
        avatarUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%2358a6ff' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='50' fill='white' text-anchor='middle' dy='.3em'%3E🤖%3C/text%3E%3C/svg%3E"
      >
      </app-speech-bubble>
    </div>
  `,
})
export class AiPersonaComponent {
  @Input() summary: DeveloperSummary | null = null;
}
