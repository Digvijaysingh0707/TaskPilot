const Task = require("../model/TaskModel")

const addTask = async (params) => {
  try {
    const result = await Task.create(params);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getTasks = async (params) => {
  try {
    const result = await Task.find(params);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  addTask,
  getTasks
}