const fs = require('fs/promises');

const { join } = require('path');

const path = join(__dirname, '..', 'talker.json');

const readFile = async () => {
const json = await fs.readFile(path);
 const data = JSON.parse(json);
 return data;
};

const getTalkerById = async (id) => {
  const json = await readFile();
  return json.find((talker) => talker.id === id);
};
const addTalker = async (talker) => {
  const { name, age, talk: { watchedAt, rate } } = talker;
  const json = await readFile();
  const nextId = json.length > 0 ? json[json.length - 1].id + 1 : 1;
  const newTalker = {
    name,
    age,
    id: nextId,
    talk: {
      watchedAt,
      rate,
    },
  };
  json.push(newTalker);
  await fs.writeFile(path, JSON.stringify(json));
  return newTalker;
};

module.exports = {
  readFile,
  getTalkerById,
  addTalker,
};