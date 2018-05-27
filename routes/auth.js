
const router = require('express').Router();

const createError = require('http-errors');

const sessionMiddleware = require('../middlewares/sesion-middleware');

const userModel = require('../models/usuario-model');

router.post('/register', (req, res, next) => {
	let { email, password, name, mobile, fecNac } = req.body;

	if (!email || !password || !name) {
		return res.status(400).send(createError(400, 'email, password, name son parametros requeridos'));
	}

	userModel.crear({
		email: email,
		password: password,
		name: name,
		mobile: mobile,
		fecNac: fecNac
	})
	.then(result => {
		if (!res.success) {
			res.status(409);
		}

		res.json(result);
	})
	.catch(next);
});

router.post('/login', (req, res, next) => {	
	let {email, password} = req.body;

	if (!email || !password) {
		return res.status(400).json(createError(400, "email y password son parametros requeridos."));
	}

	userModel.login(email, password)
	.then(result => {
		if (!result.success) {
			res.status(401);
		} else {
			res.cookie('x-session', result.sessionId);
		}

		res.json(result);
	})
	.catch(next);
});

router.post('/logout', sessionMiddleware, (req, res, next) => {
	let sessionId = req.cookies['x-session'];

	userModel
	.eliminarSession(sessionId)
	.then(result => {
		res.clearCookie('x-session');
		res.json({success: true});
	})
	.catch(next);
});

router.post('/update', sessionMiddleware, (req, res, next) => {
	let {name, mobile, fecNac, password} = req.body;
	let nData = {};
	if (name) nData.name = name;
	if (mobile) nData.mobile = mobile;
	if (fecNac) nData.fecNac = fecNac;
	if (password) nData.password = password;

	if (!Object.keys(nData).length) {
		return res.status(400).json(createError(400, 'Nada que actualizar'));
	}

	userModel.actualizar(req.user._id, nData)
	.then(result => {
		res.json({success: true});
	})
	.catch(next);
});

router.get('/profile', sessionMiddleware, (req, res, next) => {
	userModel.buscarConId(req.user._id)
	.then(result => {
		result = result.toObject();
		delete result.password;
		res.json(result);
	})
	.catch(next);
});

module.exports = router;