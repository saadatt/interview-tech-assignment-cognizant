import express from "express";

import { addTask, deleteTask, loadTasks, updateTask } from './task-list-controller';

const router = express.Router();

router.get("/", loadTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;