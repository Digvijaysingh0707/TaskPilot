const userControls = require("../controller/userControls");
const jwt = require('jsonwebtoken');

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

const findUser = async (params) => {
  try {
    const { email, password } = params;
    if (!email || !password) {
      throw new Error("Please enter all fields")
    }
    const user = await userControls.findUser({ email })
    if (!user) {
      throw new Error("Invalid Credentials")
    }
    let userName = user?.firstName
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
    let result = { email, token, userName }
    return result;
  }
  catch (error) {
    throw new Error(error.message);
  }
}


module.exports = {
  addUser,
  findUser
};
