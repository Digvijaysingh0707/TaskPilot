const express = require("express");
const taskRouter = express.Router();
const taskFunctions = require("../functions/taskFunctions");

taskRouter.post("/task", async (req, res) => {
  let result = await taskFunctions.addTask(req.body);
  res.status(200).send(result);
});

taskRouter.get("/task", async (req, res) => {
  let params = req?.query;
  let result = await taskFunctions.getTasks(params);
  res.status(200).send(result);
});

module.exports = taskRouter;