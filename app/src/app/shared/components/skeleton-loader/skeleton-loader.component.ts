import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="space-y-4">
      <div *ngFor="let _ of rowItems" class="h-12 bg-gh-surface rounded animate-pulse"></div>
    </div>
  `,
})
export class SkeletonLoaderComponent {
  @Input() show: boolean = true;
  @Input() rows: number = 3;

  get rowItems(): number[] {
    return Array.from({ length: Math.max(0, this.rows) }, (_, i) => i);
  }
}
