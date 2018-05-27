
const usuarioModel = require('../models/usuario-model');
const createError = require('http-errors');

async function middleware(req, res, next) {
	let sessionId = req.cookies['x-session'];

	if (!sessionId) {
		return res.status(401).json(createError(401, 'Se necesita iniciar sesion.'));
	}

	let session = await usuarioModel.buscarSession(sessionId);
	if (!session) {
		return res.status(401).json(createError(401, 'Session no valida'));
	}

	let usuario = await usuarioModel.buscarConId(session.userId);
	req.user = usuario;
	next();
}


module.exports = middleware;