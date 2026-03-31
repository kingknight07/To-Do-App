import { Routes } from '@angular/router';
import { TaskFormPageComponent } from './pages/task-form-page/task-form-page.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', component: TaskListPageComponent },
  { path: 'tasks/new', component: TaskFormPageComponent },
  { path: 'tasks/:id/edit', component: TaskFormPageComponent },
  { path: '**', redirectTo: 'tasks' }
];
