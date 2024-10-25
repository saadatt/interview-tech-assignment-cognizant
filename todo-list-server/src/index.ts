import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
const cors = require('cors');

import router from './routes';

//Load .env variables
dotenv.config();

const PORT = process.env.PORT || 3030;

const app = express();

app.use(cors({
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200
}));

app.use(express.json());//json parsing

app.use(morgan("dev"));//request logger


app.use("/tasks", router);

app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});