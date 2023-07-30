const express = require('express');
const loginRouter = require('./login.router');

const router = express.Router();

const talkerRouter = require('./talker.router');

router.use('/talker', talkerRouter);
router.use('/login', loginRouter);

module.exports = router;