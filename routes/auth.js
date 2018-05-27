
const router = require('express').Router();

const createError = require('http-errors');

router.post('/register', (req, res, next) => {
	res.status(405).json(createError(405));
});

router.post('/login', (req, res, next) => {
	res.status(405).json(createError(405));
});

router.post('/logout', (req, res, next) => {
	res.status(405).json(createError(405));
});

module.exports = router;