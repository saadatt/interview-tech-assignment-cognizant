import { Task } from './types';
import { asyncHandler } from "./async-middleware";
import { TaskNotFoundError } from './errors';

let lastId = 1;

let tasks: Task[] = [

];

const OPERATION_TIME = 500;

function defer<T>(value: T) {
  return new Promise<T>(resolve => setTimeout(() => resolve(value), OPERATION_TIME));
}

export const loadTasks = asyncHandler(
  async () => {
    return defer(tasks);
  },
);

function getTaskIdx(id: string): number {
  const idx = tasks.findIndex(t => t.id === id);

  if (idx === -1) {
    throw new TaskNotFoundError(id);
  }

  return idx;
}

export const updateTask = asyncHandler(async (req): Promise<Task> => {
  const idx = getTaskIdx(req.params['id']);
  const task = req.body;
  
  tasks[idx] = {
    ...tasks[idx],
    ...task
  };

  return defer(tasks[idx]);
});

export const deleteTask = asyncHandler(async (req): Promise<void> => {
  const id = req.params['id'];

  tasks = tasks.filter(t => t.id !== id);

  return defer(undefined);
});

export const addTask = asyncHandler(async (req): Promise<Task> => {
  const task = {
    ...req.body,
    id: String(lastId),
    done: false
  };
  lastId++;

  tasks = [...tasks, task];

  return defer(task);
});
