const express = require('express');
const { readFile, getTalkerById } = require('../utils/talker');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
 const talkers = await readFile();
   res.status(200).send(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talker = await getTalkerById(Number(id));
  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).send(talker);
});

module.exports = talkerRouter;