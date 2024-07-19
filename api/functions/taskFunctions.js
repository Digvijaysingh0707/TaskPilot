const TaskControls = require("../controller/taskControls")

const addTask = async (req, res) => {
  try {
    const result = await taskService.addTask(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const params = req.query;
    const result = await taskService.getTasks(params);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  addTask,
  getTasks
}