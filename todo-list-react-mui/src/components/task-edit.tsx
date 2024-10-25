import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FC, useCallback, useEffect, useState }  from "react";
import { useNavigate, useParams } from "react-router-dom";

import { updateTaskTitle, addTask } from '../actions';

import { useIsLoading, useTask } from "../selectors";
import { useAppDispatch } from "../store";

export const TaskEdit: FC<{}> = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [currentTitle, setCurrentTitle] = useState("");
  
  const taskId = params.taskId ?? 'new';
  const isLoading = useIsLoading();

  const task = useTask(taskId);

  useEffect(() => {
    setCurrentTitle(task?.title ?? '');
  }, [task]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  }, []);

  const onSubmit = useCallback(async () => {
    if (taskId === 'new') {
      await dispatch(addTask({
        title: currentTitle
      }));
    } else {
      await dispatch(updateTaskTitle({
        id: taskId,
        title: currentTitle
      }));
    }
    navigate('/');
  }, [taskId, currentTitle]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}>
      <Typography variant="h4">Edit task title</Typography>
      <TextField 
        autoFocus
        id="outlined-basic" 
        variant="standard" 
        value={currentTitle} 
        onChange={onChange} 
        disabled={isLoading}
      />
      <Button onClick={onSubmit} disabled={isLoading}>Submit</Button>
    </Box>
  );
};
