import { Action, createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { ServerApi } from "../api/server-api";
import { allTasksSelector, createTaskSelector, tasksStatusSelector } from "../selectors";
import { State } from "../state/state";

type AsyncThunkConfig = {
  state: State;
  dispatch: ThunkDispatch<State, ServerApi, Action>;
  extra: ServerApi;
};

export const loadTasks = createAsyncThunk.withTypes<AsyncThunkConfig>()("load", async (_, thunkApi) => {
  const api = thunkApi.extra;
  return api.loadTasks();
}, {
  condition(_, thunkApi) {
    const status = tasksStatusSelector(thunkApi.getState());

    return status !== 'loaded';
  }
});

export const toggleTaskDone = createAsyncThunk.withTypes<AsyncThunkConfig>()("toggleTaskDone", async (params: {
  id: string;
}, thunkApi) => {
  const tasks = allTasksSelector(thunkApi.getState());
  const task = tasks.find(t => t.id === params.id);

  const api = thunkApi.extra;

  return api.updateTask(params.id, {
    done: task?.done
  });
});

export const updateTaskTitle = createAsyncThunk.withTypes<AsyncThunkConfig>()("updateTaskTitle", async (params: {
  id: string;
  title: string;
}, thunkApi) => {
  const api = thunkApi.extra;

  return api.updateTask(params.id, {
    title: params.title
  });
});


export const removeTask = createAsyncThunk.withTypes<AsyncThunkConfig>()("removeTask", async (params: {
  id: string;
}, thunkApi) => {
  const api = thunkApi.extra;

  return api.deleteTask(params.id);
});

export const addTask = createAsyncThunk.withTypes<AsyncThunkConfig>()("addTask", async (params: {
  title: string;
}, thunkApi) => {
  const api = thunkApi.extra;

  return api.addTask(params.title);
});