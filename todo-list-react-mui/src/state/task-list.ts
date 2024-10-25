import { Task } from "./task";

export interface TaskList {
  tasks: Task[];
  status: 'idle' | 'loading' | 'error' | 'loaded';
  error?: string;
}
