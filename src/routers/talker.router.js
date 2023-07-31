const express = require('express');
const authorized = require('../middleware/authorization');
const validateTalker = require('../middleware/validateTalker');
const { readFile, getTalkerById, 
  addTalker, updateTalker, deleteTalker } = require('../utils/talker');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
 const talkers = await readFile();
   res.status(200).send(talkers);
});

talkerRouter.get('/search', authorized, async (req, res) => {
  const { q } = req.query;
  const allTalkers = await readFile();

  if (!q || q === '') {
    return res.status(200).json(allTalkers);
  }

  const filteredTalkers = allTalkers.filter((talker) => talker.name.includes(q));

  return res.status(200).json(filteredTalkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const talker = await getTalkerById(Number(id));
  if (!talker) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).send(talker);
});

talkerRouter.post('/', authorized, validateTalker, async (req, res) => {
  const newTalker = await addTalker({ ...req.body });

  if (!newTalker) return res.status(400).send();
  res.status(201).send(newTalker);
});

talkerRouter.put('/:id', validateTalker, authorized, async (req, res) => {
  const id = Number(req.params.id);

  const updatedTalker = await updateTalker(id, req.body);

  if (!updatedTalker) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).send(updatedTalker);
});

talkerRouter.delete('/:id', authorized, async (req, res) => {
  const { id } = req.params;

  const talkerToDelete = await deleteTalker(Number(id));
  if (!talkerToDelete) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(204).end();
});

module.exports = talkerRouter;