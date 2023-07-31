// const validateToken = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res.status(401).send({ message: 'Token não encontrado' });
//   }
//   if (typeof authorization !== 'string' || authorization.length !== 16) {
//     return res.status(401).send({ message: 'Token inválido' });
//   }

//   next();
// };

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }

  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).send({ message: 
      'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatched = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;

    if (!watchedAt || watchedAt === null) {
      res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
    }
    const formatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!formatDate.test(watchedAt)) {
      return res.status(400).send({ message: 
        'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    next();
  };

  const validateTalkRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate === undefined) {
      return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
    }
    if (!(Number.isInteger(rate) && rate >= 1 && rate <= 5)) {
      return res.status(400).send({ message: 
        'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }

    next();
  };

const validateTalker = [
  // validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatched,
  validateTalkRate,
];

module.exports = validateTalker;
