import { TaskList } from "./task-list";

export interface State {
  taskList: TaskList;
}

export type Filter = 'all' | 'done' | 'in-progress';