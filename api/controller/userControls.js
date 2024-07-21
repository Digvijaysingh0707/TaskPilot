const User = require("../model/UserModel")

const addUser = async (params) => {
  try {
    const result = await User.create(params);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

const duplicateUser = async (params) => {
  try {
    const result = await User.findOne(params)
    return result
  }
  catch (error) {
    throw new Error(error.message);
  }
}

const findUser = async (params) => {
  try {
    const result = await User.findOne(params)
    return result
  }
  catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  duplicateUser,
  addUser,
  findUser
}