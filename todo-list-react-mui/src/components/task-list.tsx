import React from "react";
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import List from '@mui/material/List';

import { Link } from "./link";
import { TaskListItem } from "./task-list-item";
import { useFilteredTasks } from "../selectors";

interface Props {
  filter: 'all' | 'done' | 'in-progress';
}

export const TaskList: FC<Props> = (props) => {
  const tasks = useFilteredTasks(props.filter);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Todo list
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link to="/">All</Link>
        <Link to="/done">Done</Link>
        <Link to="/in-progress">In progress</Link>
        <Link to="/edit/new">Create new task</Link>
      </Box>
      <List 
          sx={{
              width: '100%', 
              maxWidth: 500, 
              bgcolor: 'background.paper',
              fontFamily: 'inherit'
          }}
      >
        {
          tasks.map(task => (
            <TaskListItem key={task.id} task={task} />
          ))
        }
      </List>
    </Box>
  );
};
