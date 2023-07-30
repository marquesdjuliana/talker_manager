const express = require('express');
const { readFile } = require('../utils/talker');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
  // try {
  //   const talkers = await readFile();
  //   if (!talkers) {
  //     return res.status(200).json(readFile);
  //   }
  //   return res.status(200).send([]);
  // } catch (error) {
  //   res.status(500).send('Algo deu errado!');
  // }
 const talkers = await readFile();
   res.status(200).send(talkers);
});

module.exports = talkerRouter;