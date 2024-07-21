const express = require("express");
const userRouter = express.Router();
const userFunctions = require("../functions/userFunctions");

userRouter.post('/signup', async (req, res) => {
  try {
    const result = await userFunctions.addUser(req.body);
    res.status(201).send({ msg: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message || 'An error occurred' });
  }
});


module.exports = userRouter;