import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { Filter, State } from "../state";

export const useAppSelector = useSelector.withTypes<State>();

export const stateSelector = (state: State) => state;

export const tasksStatusSelector = createSelector(stateSelector, state => state.taskList.status);
export const allTasksSelector = createSelector(stateSelector, state => state.taskList.tasks);
export const doneTasksSelector = createSelector(allTasksSelector, taskList => taskList.filter(t => t.done));
export const inProgressTasksSelector = createSelector(allTasksSelector, taskList => taskList.filter(t => !t.done));

export const createFilterSelector = (filter: Filter) => {
  switch (filter) {
    case 'all': return allTasksSelector;
    case 'done': return doneTasksSelector;
    case 'in-progress': return inProgressTasksSelector;
  }
};

export const createTaskSelector = (id: string) => createSelector(allTasksSelector, tasks => tasks.find(t => t.id === id));

export const useTask = (id: string) => {
  const selector = useMemo(() => createTaskSelector(id), [id]);
  return useAppSelector(selector);
};

export const useIsLoading = () => {
  return useAppSelector(tasksStatusSelector) === 'loading';
};

export const useFilteredTasks = (filter: Filter) => {
  const selector = useMemo(() => createFilterSelector(filter), [filter]);
  return useAppSelector(selector);
};
