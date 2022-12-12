export interface Task {
  id?: string;
  key: string;
  status: TaskStatus;
  task: string;
}

export interface NewTask {
  status: TaskStatus;
  task: string;
}

export type TaskStatus = "open" | "inProgress" | "complete";

export type TaskStatusFilter = "all" | TaskStatus;

export interface TaskDeleteList {
  [prop: string]: null
}