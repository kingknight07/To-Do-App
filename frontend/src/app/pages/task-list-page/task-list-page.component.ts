import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskApiService } from '../../services/task-api.service';
import { TaskStatus, taskStatusLabel } from '../../models/task-status.model';
import { TaskItem } from '../../models/task-item.model';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgClass, NgFor, NgIf, RouterLink],
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss'
})
export class TaskListPageComponent implements OnInit {
  private readonly api = inject(TaskApiService);

  readonly tasks$ = this.api.tasks$;
  readonly taskStatusLabel = taskStatusLabel;
  readonly taskStatus = TaskStatus;

  loading = true;
  error = '';

  async ngOnInit(): Promise<void> {
    try {
      await this.api.refreshTasks();
    } catch (error) {
      this.error = this.getErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  async toggleStatus(task: TaskItem): Promise<void> {
    const nextStatus = task.status === TaskStatus.Completed ? TaskStatus.Pending : TaskStatus.Completed;

    try {
      await this.api.updateTask(task.id, {
        title: task.title,
        description: task.description,
        status: nextStatus
      });
    } catch (error) {
      this.error = this.getErrorMessage(error);
    }
  }

  async deleteTask(task: TaskItem): Promise<void> {
    if (!confirm(`Delete "${task.title}"?`)) {
      return;
    }

    try {
      await this.api.deleteTask(task.id);
    } catch (error) {
      this.error = this.getErrorMessage(error);
    }
  }

  countPending(tasks: TaskItem[]): number {
    return tasks.filter((task) => task.status === TaskStatus.Pending).length;
  }

  countCompleted(tasks: TaskItem[]): number {
    return tasks.filter((task) => task.status === TaskStatus.Completed).length;
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unable to load tasks right now.';
  }
}
