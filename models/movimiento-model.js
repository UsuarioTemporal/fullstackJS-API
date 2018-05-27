
const {MovimientoModel} = require('./schemas');


async function guardar(movimiento) {
	let document = new MovimientoModel(movimiento);
	return document.save();
}

async function listar(userId) {
	return MovimientoModel.find({userId: userId}).exec();
}

async function get(id) {
	return MovimientoModel.findOne({id: id}).exec();
}

async function actualizar(id, data, userId) {
	return MovimientoModel.updateOne({id: id, userId: userId}, data).exec();
}

module.exports = {
	guardar: guardar,
	listar: listar,
	get: get,
	actualizar: actualizar
};
