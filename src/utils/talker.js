const fs = require('fs/promises');

const { join } = require('path');

const path = join(__dirname, '..', 'talker.json');

const readFile = async () => {
const json = await fs.readFile(path);
 const data = JSON.parse(json);
 return data;
};

module.exports = {
  readFile,
};