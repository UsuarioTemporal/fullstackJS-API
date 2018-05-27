
const {UserModel, SessionModel} = require('./schemas');

const passwordHash = require('../tools/password-hash');

const randomString = require('randomstring');

async function crear(usuario) {
	let user = await UserModel.findOne({email: usuario.email}).exec();

	if (user) {
		return {success: false, detalle: 'Correo ya existe'};
	}

	// Guardamos un hash del password
	usuario.password = await passwordHash.generateHash(usuario.password);

	user = new UserModel(usuario);
	await user.save();

	return {success: true};
}

async function buscarConId(id) {
	return UserModel.findById(id).exec();
}

async function actualizar(id, data) {
	if (data.password) {
		data.password = await passwordHash.generateHash(data.password);
	}
	return UserModel.updateOne({_id: id}, data).exec();
}

async function login(email, password) {
	let user = await UserModel.findOne({email: email}).exec();

	if (!user) {
		return {success: false, detalle: 'Usuario no existe.'};
	}

	let compareResult = await passwordHash.compareHash(password, user.password);

	if (!compareResult) {
		return {success: false, detalle: 'Clave incorrecta'};
	}

	let sessionid = randomString.generate(64);
	let sesion = new SessionModel({_id: sessionid, userId: user._id});
	await sesion.save();

	return {success: true, sessionId: sessionid};
}

async function eliminarSession(sessionId) {
	return SessionModel.deleteOne({_id: sessionId});
}

async function buscarSession(sessionId) {
	return SessionModel.findById(sessionId).exec();
}

module.exports = {
	crear: crear,
	buscarConId: buscarConId,
	actualizar: actualizar,
	login: login,
	eliminarSession: eliminarSession,
	buscarSession: buscarSession
};