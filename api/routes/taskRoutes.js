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

taskRouter.get('/task', async (req, res) => {
  try {
    const params = req.query;
    const result = await taskFunctions.getTasks(params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message || 'An error occurred' });
  }
});

taskRouter.delete('/task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const result = await taskFunctions.deleteTask(taskId);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message || 'An error occurred' });
  }
});

taskRouter.put('/task', async (req, res) => {
  try {
    const result = await taskFunctions.updateTask(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message || 'An error occurred' });
  }
});

module.exports = taskRouter;