const routes = require('express').Router();
const animal = require('../controllers/animal');

const validator = require('../validation/validate.animal');

routes.get('/', animal.findAll);

routes.get('/record/:animal_id', animal.findOne);

routes.post('/record', validator.saveAnimalRecord, animal.create);

routes.put('/record/:animal_id', validator.saveAnimalRecord, animal.update);

routes.delete('/record/:animal_id', animal.delete);

module.exports = routes;
