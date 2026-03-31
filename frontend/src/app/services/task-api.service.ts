import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { TaskItem, TaskUpsertPayload } from '../models/task-item.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5201/api/tasks';
  private readonly tasksSubject = new BehaviorSubject<TaskItem[]>([]);

  readonly tasks$ = this.tasksSubject.asObservable();

  async refreshTasks(): Promise<void> {
    const tasks = await firstValueFrom(this.http.get<TaskItem[]>(this.apiUrl));
    this.tasksSubject.next(tasks);
  }

  async getTask(id: number): Promise<TaskItem> {
    return await firstValueFrom(this.http.get<TaskItem>(`${this.apiUrl}/${id}`));
  }

  async createTask(payload: TaskUpsertPayload): Promise<TaskItem> {
    const task = await firstValueFrom(this.http.post<TaskItem>(this.apiUrl, payload));
    await this.refreshTasks();
    return task;
  }

  async updateTask(id: number, payload: TaskUpsertPayload): Promise<TaskItem> {
    const task = await firstValueFrom(this.http.put<TaskItem>(`${this.apiUrl}/${id}`, payload));
    await this.refreshTasks();
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
    await this.refreshTasks();
  }
}
