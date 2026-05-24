import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card flex flex-col gap-2">
      <p class="text-gh-muted text-sm">{{ label }}</p>
      <p class="text-2xl font-bold text-gh-blue">{{ value }}</p>
      <p *ngIf="subtext" class="text-xs text-gh-muted">{{ subtext }}</p>
    </div>
  `,
})
export class StatCardComponent {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() subtext?: string;
}
