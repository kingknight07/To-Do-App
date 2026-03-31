export enum TaskStatus {
  Pending = 0,
  Completed = 1
}

export function taskStatusLabel(status: TaskStatus): string {
  return status === TaskStatus.Completed ? 'Completed' : 'Pending';
}
