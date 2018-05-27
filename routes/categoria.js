
const router = require('express').Router();
const createError = require('http-errors');

router.get('/', (req, res, next) => {
	next(createError(405));
});

router.get('/:id', (req, res, next) => {
	next(createError(405));
});

router.post('/', (req, res, next) => {
	next(createError(405));
});

router.put('/', (req, res, next) => {
	next(createError(405));
});

router.patch('/', (req, res, next) => {
	next(createError(405));
});

module.exports = router;