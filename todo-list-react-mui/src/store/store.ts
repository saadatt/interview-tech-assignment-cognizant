import { configureStore } from '@reduxjs/toolkit';
import { withExtraArgument } from 'redux-thunk';

import { taskListSlice } from './task-list-slice';
import { ServerApi } from '../api/server-api';

export const createStore = (api: ServerApi) => {
  const thunkMiddleware = withExtraArgument(api);

  return configureStore({
    reducer: {
      taskList: taskListSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: false
    }).concat(thunkMiddleware),
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];