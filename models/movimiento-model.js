
const {MovimientoModel} = require('./schemas');


async function guardar(movimiento) {
	let document = new MovimientoModel(movimiento);
	return document.save();
}

async function listar() {
	return MovimientoModel.find().exec();
}

async function get(id) {
	return MovimientoModel.findOne({id: id}).exec();
}

async function actualizar(id, data) {
	return MovimientoModel.updateOne({id: id}, data).exec();
}

module.exports = {
	guardar: guardar,
	listar: listar,
	get: get,
	actualizar: actualizar
};
