import { TaskStatus } from './task-status.model';

export interface TaskItem {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TaskUpsertPayload {
  title: string;
  description: string | null;
  status: TaskStatus;
}
