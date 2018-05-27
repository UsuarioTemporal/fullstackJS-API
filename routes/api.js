
const router = require('express').Router();

router.use('/categoria', require('./categoria'));
router.use('/movimiento', require('./movimiento'));

module.exports = router;