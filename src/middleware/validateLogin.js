const validateEmailFormat = (req, res, next) => {
  const { email } = req.body;
  const requiredErrorMessage = 'O campo "email" é obrigatório';
  const formatErrorMessage = 'O "email" deve ter o formato "email@email.com"';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const emailValue = email !== undefined ? email : null;

  if (!emailValue || emailValue === null) {
    return res.status(400).send({ message: requiredErrorMessage });
  }

  if (!emailRegex.test(emailValue)) {
    return res.status(400).send({ message: formatErrorMessage });
  }

  next();
};

const validatePasswordFormat = (req, res, next) => {
  const { password } = req.body;
  const minLength = 6;
  const requiredErrorMessage = 'O campo "password" é obrigatório';
  const lengthErrorMessage = `O "password" deve ter pelo menos ${minLength} caracteres`;

  const passwordValue = password !== undefined ? password : null;

  if (!passwordValue || passwordValue.length < minLength) {
  return res.status(400).send({ message: !passwordValue 
    ? requiredErrorMessage : lengthErrorMessage });
  }

  next();
};

const validateLoginFormat = [
  validateEmailFormat,
  validatePasswordFormat,
];
module.exports = validateLoginFormat;
