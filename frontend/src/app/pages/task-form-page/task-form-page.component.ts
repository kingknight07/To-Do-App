import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskApiService } from '../../services/task-api.service';
import { TaskStatus } from '../../models/task-status.model';

@Component({
  selector: 'app-task-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './task-form-page.component.html',
  styleUrl: './task-form-page.component.scss'
})
export class TaskFormPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(TaskApiService);

  readonly taskStatus = TaskStatus;

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    description: [''],
    status: [TaskStatus.Pending as TaskStatus, [Validators.required]]
  });

  taskId: number | null = null;
  loading = false;
  saving = false;
  error = '';
  pageTitle = 'Create Task';

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.taskId = Number(id);
    this.pageTitle = 'Edit Task';
    this.loading = true;

    try {
      const task = await this.api.getTask(this.taskId);
      this.form.patchValue({
        title: task.title,
        description: task.description ?? '',
        status: task.status
      });
    } catch (error) {
      this.error = this.getErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = '';

    try {
      const payload = {
        title: this.form.controls.title.value.trim(),
        description: this.form.controls.description.value.trim() || null,
        status: this.form.controls.status.value
      };

      if (this.taskId === null) {
        await this.api.createTask(payload);
      } else {
        await this.api.updateTask(this.taskId, payload);
      }

      await this.router.navigate(['/tasks']);
    } catch (error) {
      this.error = this.getErrorMessage(error);
    } finally {
      this.saving = false;
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unable to save this task.';
  }
}
