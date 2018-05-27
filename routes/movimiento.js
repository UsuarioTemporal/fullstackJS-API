
const router = require('express').Router();
const createError = require('http-errors');

let data = [
	{ "id": 1, "fecha": "01/10/2018", "monto": 823.12, "categoria": "ingreso", "descripcion": "Freelance de Ecommerce" },
	{ "id": 2, "fecha": "02/10/2018", "monto": 157.23, "categoria": "gasto", "descripcion": "Dia de la madre" },
	{ "id": 3, "fecha": "03/10/2018", "monto": 87.21, "categoria": "ingreso", "descripcion": "Consultoría" },
	{ "id": 4, "fecha": "04/10/2018", "monto": 120.21, "categoria": "gasto", "descripcion": "Uber" },
	{ "id": 5, "fecha": "05/10/2018", "monto": 56.12, "categoria": "gasto", "descripcion": "Salida romantica" },
	{ "id": 6, "fecha": "06/10/2018", "monto": 789.21, "categoria": "ingreso", "descripcion": "Freelance de Desarrollo de sitio web" }
];

router.get('/', (req, res, next) => {
	res.json(data);
});

router.get('/:id', (req, res, next) => {
	let id = req.params.id;
	
	res.json(data[0]);
});

router.post('/', (req, res, next) => {
	next(createError(405));
})

router.put('/', (req, res, next) => {
	next(createError(405));
});

router.patch('/', (req, res, next) => {
	next(createError(405));
});

module.exports = router;