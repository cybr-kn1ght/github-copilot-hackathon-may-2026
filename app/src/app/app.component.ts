import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen flex flex-col">
      <header class="sticky top-0 z-40 border-b border-gh-border bg-gh-bg/95 backdrop-blur">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <h1 class="text-gradient text-2xl font-bold">DevMetrics</h1>
        </div>
      </header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
