
const router = require('express').Router();
const createError = require('http-errors');

const movimientoModel = require('../models/movimiento-model');

router.get('/', (req, res, next) => {
	let {skip, size} = req.query;
	skip = parseInt(skip) || 0;
	skip = Math.max(skip, 0);

	size = parseInt(size) || 10;
	size = Math.min(Math.max(size, 1), 50);

	movimientoModel.listar(req.user._id, skip, size)
	.then(movimientos => {
		res.json(movimientos);
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	let id = req.params.id;

	movimientoModel.get(id)
	.then(movimiento => {
		if (!movimiento) {
			return res.status(404).json(createError(404));
		}

		if (req.user._id.toString() !== movimiento.userId) {
			return res.status(403).json(createError(403, 'Este movimiento no le pertenece.'))
		}

		res.json(movimiento);
	}).catch(next);
});

router.post('/', (req, res, next) => {
	let {fecha, monto, categoria, descripcion} = req.body;

	movimientoModel.guardar({
		fecha: fecha,
		monto: monto,
		categoria: categoria,
		descripcion: descripcion,
		userId: req.user._id
	}).then(() => {
		res.json({success: true});
	})
	.catch(next);
});

router.put('/', (req, res, next) => {
	next(createError(405));
});

router.patch('/:id', (req, res, next) => {
	let id = req.params.id;

	let objUpdate = {};
	if (req.body.fecha) objUpdate.fecha = req.body.fecha;
	if (req.body.monto) objUpdate.monto = req.body.monto;
	if (req.body.categoria) objUpdate.categoria = req.body.categoria;
	if (req.body.descripcion) objUpdate.descripcion = req.body.descripcion;

	if (!Object.keys(objUpdate).length) {
		return res.status(400).json(createError(400));
	}

	movimientoModel.actualizar(id, objUpdate, req.user._id)
	.then(mov => {
		if (!mov.n) {
			return res.status(404).json(createError(404));
		}

		//check mov.nModified > 0
		res.json({success: true});
	}).catch(next);
});

module.exports = router;