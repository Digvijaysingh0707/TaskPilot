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

module.exports = {
  addTask,
  getTasks
};
