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

const deleteTask = async (taskId) => {
  try {
    const result = await Task.findByIdAndDelete(taskId);
    return result;
  } catch (error) {
    throw new Error(error?.message);
  }
};

const updateTask = async (params) => {
  try {
    let { title, description, _id } = params
    const result = await Task.findByIdAndUpdate({ _id }, { title, description }, { new: true });
    return result;
  } catch (error) {
    throw new Error(error?.message);
  }
};

module.exports = {
  addTask,
  getTasks,
  deleteTask,
  updateTask
}