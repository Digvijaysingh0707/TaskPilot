const express = require("express");
const taskRouter = express.Router();
const taskFunctions = require("../functions/taskFunctions");

taskRouter.post('/task', async (req, res) => {
  try {
    const result = await taskFunctions.addTask(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message || 'An error occurred' });
  }
});

// Route to get tasks
taskRouter.get('/task', async (req, res) => {
  try {
    const params = req.query;
    const result = await taskFunctions.getTasks(params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message || 'An error occurred' });
  }
});

module.exports = taskRouter;