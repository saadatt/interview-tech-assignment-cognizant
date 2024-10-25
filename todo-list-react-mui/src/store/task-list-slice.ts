import { createSlice } from '@reduxjs/toolkit'
import { TaskList } from '../state/task-list';
import { Task } from '../state/task';
import { loadTasks, toggleTaskDone, removeTask, updateTaskTitle, addTask } from '../actions';

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState: {
    status: 'idle',
    tasks: []
  } as TaskList,
  reducers: {},
  extraReducers: (builder) => {
    return builder.addCase(loadTasks.pending, (state) => {
      return {
        ...state,
        tasks: [],
        error: undefined,
        status: 'loading'
      };
    }).addCase(loadTasks.rejected, (state, action) => {
      return {
        ...state,
        tasks: [] as Task[],
        error: action.error.message,
        status: 'error'
      };
    }).addCase(loadTasks.fulfilled, (state, action) => {
      return {
        ...state,
        error: undefined,
        tasks: action.payload,
        status: 'loaded'
      };
    }).addCase(toggleTaskDone.pending, (state, action) => {
      const id = action.meta.arg.id;

      const idx = state.tasks.findIndex(t => t.id === id);
      const newTask: Task = {
        ...state.tasks[idx],
        done: !state.tasks[idx].done
      };

      const newTasks = [...state.tasks];
      newTasks[idx] = newTask;

      return {
        ...state,
        tasks: newTasks,
        error: undefined,
        status: 'loading'
      };
    }).addCase(toggleTaskDone.fulfilled, (state, action) => {
      const id = action.meta.arg.id;
      const newTask = action.payload;

      const idx = state.tasks.findIndex(t => t.id === id);

      const newTasks = [...state.tasks];
      newTasks[idx] = newTask;

      return {
        ...state,
        tasks: newTasks,
        error: undefined,
        status: 'loaded'
      };
    }).addCase(removeTask.pending, (state, action) => {
      const id = action.meta.arg.id;

      const newTasks = state.tasks.filter(t => t.id !== id);

      return {
        ...state,
        tasks: newTasks,
        error: undefined,
        status: 'loading'
      };
    }).addCase(removeTask.fulfilled, (state, action) => {
      return {
        ...state,
        error: undefined,
        status: 'loaded'
      };
    }).addCase(updateTaskTitle.pending, (state, action) => {
      const { arg } = action.meta;
      const id = arg.id;

      const idx = state.tasks.findIndex(t => t.id === id);
      const newTask: Task = {
        ...state.tasks[idx],
        title: arg.title
      };

      const newTasks = [...state.tasks];
      newTasks[idx] = newTask;

      return {
        ...state,
        tasks: newTasks,
        error: undefined,
        status: 'loading'
      };
    }).addCase(updateTaskTitle.fulfilled, (state, action) => {
      const { arg } = action.meta;
      const id = arg.id;

      const idx = state.tasks.findIndex(t => t.id === id);

      const newTasks = [...state.tasks];
      newTasks[idx] = action.payload;

      return {
        ...state,
        tasks: newTasks,
        error: undefined,
        status: 'loaded'
      };
    }).addCase(addTask.pending, (state) => {
      return {
        ...state,
        error: undefined,
        status: 'loading'
      };
    }).addCase(addTask.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: undefined,
        status: 'loaded'
      };
    })
  },
});
