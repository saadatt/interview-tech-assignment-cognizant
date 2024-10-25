import { Task } from "../state/task";

interface Params {
  port: number;
  host: string;
}

export const createServerApi = (params: Params) => {
  const getRestUrl = (restEntityRoot: string) => (route: string) =>
    `http://${params.host}:${params.port}/${restEntityRoot}/${route}`;

  const getUrl = getRestUrl('tasks');

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return ({
    async loadTasks(): Promise<Task[]> {
      const response = await fetch(getUrl(''));
      return response.json();
    },
    async updateTask(id: string, task: Partial<Omit<Task, 'id'>>): Promise<Task> {
      const response = await fetch(getUrl(id), {
        method: 'PUT',
        headers,
        body: JSON.stringify(task)
      });
      return response.json();
    },
    async deleteTask(id: string) {
      await fetch(getUrl(id), {
        method: 'DELETE'
      });
    },
    async addTask(title: string): Promise<Task> {
      const response = await fetch(getUrl(''), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title
        })
      });
      return response.json();
    }
  })
};

export type ServerApi = ReturnType<typeof createServerApi>;