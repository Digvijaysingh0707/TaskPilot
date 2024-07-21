const userControls = require("../controller/userControls");

const addUser = async (params) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = params;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new Error("Please enter all fields")
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match")
    }

    const existedUser = await userControls.duplicateUser({ email })

    if (existedUser) {
      throw new Error("User already exists")
    }

    const result = await userControls.addUser(params);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  addUser,

};
