import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="shell">
      <header class="topbar">
        <div class="brand-wrap">
          <div class="brand-mark">MT</div>
          <div>
            <p class="eyebrow">Mini To-Do App</p>
            <h1>Task Management System</h1>
          </div>
        </div>
        <nav class="nav">
          <a routerLink="/tasks" routerLinkActive="active">Tasks</a>
          <a routerLink="/tasks/new" routerLinkActive="active">Add Task</a>
          <a href="http://localhost:5201/swagger" target="_blank" rel="noopener">API Docs</a>
        </nav>
      </header>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {}
