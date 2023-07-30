const express = require('express');
const generateToken = require('../utils/generateToken');

const loginRouter = express.Router();

loginRouter.post('/', async (_req, res) => {
  const randomToken = await generateToken();
  res.status(200).send({ token: randomToken });
});

module.exports = loginRouter;