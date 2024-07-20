const TaskControls = require("../controller/taskControls");

const addTask = async (params) => {
  try {
    const result = await TaskControls.addTask(params);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTasks = async (params) => {
  try {
    const result = await TaskControls.getTasks(params);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTask = async (params) => {
  try {
    const result = await TaskControls.deleteTask(params);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTask = async (params) => {
  try {
    const result = await TaskControls.updateTask(params);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  updateTask
};
