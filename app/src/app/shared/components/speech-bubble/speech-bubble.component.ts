import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speech-bubble',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-4">
      <div class="flex-shrink-0">
        <img *ngIf="avatarUrl" [src]="avatarUrl" [alt]="personaName" class="w-16 h-16 rounded-full object-cover" />
        <div *ngIf="!avatarUrl" class="w-16 h-16 rounded-full bg-gh-surface border-2 border-gh-border flex items-center justify-center">
          <span class="text-2xl">🤖</span>
        </div>
      </div>
      <div class="flex-1">
        <div class="bg-gh-surface border-l-4 border-gh-blue rounded-lg p-4">
          <p class="text-sm font-semibold text-gh-blue mb-2">{{ personaName }}</p>
          <p class="text-gh-text leading-relaxed">{{ text }}</p>
        </div>
      </div>
    </div>
  `,
})
export class SpeechBubbleComponent {
  @Input() personaName: string = 'DevMetrics AI';
  @Input() text: string = '';
  @Input() avatarUrl?: string;
}
