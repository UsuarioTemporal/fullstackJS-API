
const mongoose = require('mongoose');

const host = process.env.MONGO_HOST || 'localhost';
const db = process.env.MONGO_DB || 'sueldoapp';
const port = process.env.MONGO_PORT || 27017;

const options = {
	autoIndex: true
};

mongoose.connect(`mongodb://${host}:${port}/${db}`, options, (err) => {
	if (!err) {
		return console.info('Mondobd connectado');
	}

	console.error('Error al conectar con mongodb.');
	process.exit(1);
});

// Declaracion de los esquemas
const MoviminetoSchema  = new mongoose.Schema({
	id: {
		type: Number,
		index: true,
		unique: true,
		required: true,
		default: 0
	},
	userId: {
		type: String,
		index: true,
		required: true
	},
	fecha: String,
	monto: {
		type: Number
	},
	categoria: {
		type: String
	},
	descripcion: {
		type: String,
		default: '',
	}
});

/**
 * Para lograr el autoincremento
 */
const counter = mongoose.model('Counter', new mongoose.Schema({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 }
}));

MoviminetoSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'movimiento'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        doc.id = count.seq;
        next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});


//Declaracion de los modelos
const MovimientoModel = mongoose.model('Movimiento', MoviminetoSchema);


const UserModel = mongoose.model('Usuario', new mongoose.Schema({
	email: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	mobile: String,
	fecNac: Date
}));

const SessionModel = mongoose.model('Session', new mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	}
}));

module.exports = {
	MovimientoModel: MovimientoModel,
	UserModel: UserModel,
	SessionModel: SessionModel
};