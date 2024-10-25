import React,{ FC, useCallback } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { Task } from "../state";
import { toggleTaskDone, removeTask } from "../actions";

import { useAppDispatch } from "../store";
import { useIsLoading } from "../selectors";

import { Link } from './link';

interface Props {
  task: Task;
}

export const TaskListItem: FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  const isLoading = useIsLoading();
  
  const onRemoveTask = useCallback(() => {
    dispatch(removeTask(task))
  }, []);

  const onToggleTaskDone = useCallback(() => {
    dispatch(toggleTaskDone(task));
  }, []);

  return (
    <ListItem
        key={task.id}
        secondaryAction={
          <Box>
            <Link to={"/edit/" + task.id}>Edit</Link>
            <IconButton edge="end" onClick={onRemoveTask} disabled={isLoading}>
                <DeleteOutlineIcon />
            </IconButton>
          </Box>
        }
        disablePadding
    >
        <ListItemButton 
            role={undefined} 
            dense
        >
            <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.done}
                  tabIndex={-1}
                  disableRipple
                  disabled={isLoading}
                  onChange={onToggleTaskDone}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  color='warning'
                />
            </ListItemIcon>
            <ListItemText id={task.id} primary={task.title} />
        </ListItemButton>
    </ListItem>
  );
};
