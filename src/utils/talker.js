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

const updateTalker = async (id, { name, age, talk: { watchedAt, rate } }) => {
  const json = await readFile();
  const updateTalkerId = json.find((talker) => talker.id === id);
  if (!updateTalkerId) {
    return null;
  }

  updateTalkerId.name = name;
  updateTalkerId.age = age;
  updateTalkerId.talk.rate = rate;
  updateTalkerId.talk.watchedAt = watchedAt;

  await fs.writeFile(path, JSON.stringify(json));
  return updateTalkerId;
};

const deleteTalker = async (id) => {
  const json = await readFile();
  const index = json.findIndex((talker) => talker.id === id);
  if (index !== -1) {
    const deletedTalker = json.splice(index, 1)[0]; 
    await fs.writeFile(path, JSON.stringify(json));
    return deletedTalker;
  }
  return null; 
};

module.exports = {
  readFile,
  getTalkerById,
  addTalker,
  updateTalker,
  deleteTalker,
};