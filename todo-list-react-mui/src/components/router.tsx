import React from "react";

import { createBrowserRouter, defer } from "react-router-dom";
import { TaskList } from "./task-list";
import { AppStore } from "../store/store";
import { loadTasks } from "../actions";
import { TaskEdit } from "./task-edit";
import { Root } from "./root";

export const createRouter = (store: AppStore) => { 
  const loader =  () => defer({ data: store.dispatch(loadTasks()) });
  return createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader,
      children: [
        {
          path: '/',
          element: <TaskList filter="all" />
        },
        {
          path: "/done",
          element: <TaskList filter="done" />
        },
        {
          path: "/in-progress",
          element: <TaskList filter="in-progress" />
        },    
        {
          path: "/edit/:taskId",
          element: <TaskEdit />
        }    
      ]
    },
  ]);
}