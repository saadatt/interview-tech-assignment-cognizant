import { Task } from "../state/task";
import { ServerApi } from "./server-api";

let tasks: Task[] = [
  {
    title: "Task 1",
    done: false,
    id: "1"
  },
  {
    title: "Task 2",
    done: true,
    id: "2"
  }
];

const OPERATION_TIME = 1000;

function defer<T>(value: T) {
  return new Promise<T>(resolve => setTimeout(() => resolve(value), OPERATION_TIME));
}

export const localServerApi: ServerApi = {
  async loadTasks() {
    return defer(tasks);
  },

  async updateTask(id: string, task: Partial<Omit<Task, 'id'>>): Promise<Task> {
    const newTasks = [...tasks];
    const idx = tasks.findIndex(t => t.id === id);
    newTasks[idx] = {
      ...newTasks[idx],
      ...task
    };

    return defer(newTasks[idx]).finally(() => {
      tasks = newTasks;
    });
  },

  async deleteTask(id: string) {
    const newTasks = tasks.filter(t => t.id !== id);
    return defer(undefined).finally(() => {
      tasks = newTasks;
    });
  },

  async addTask(title: string): Promise<Task> {
    const task = {
      id: String(tasks.length + 1),
      title,
      done: false
    };

    const newTasks = [...tasks, task];

    return defer(task).finally(() => {
      tasks = newTasks;
    });
  }
};