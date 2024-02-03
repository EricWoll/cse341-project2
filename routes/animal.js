const routes = require('express').Router();
const animal = require('../controllers/animal');
const { isAuthenticated } = require('../middleware/authenticate');

const validator = require('../middleware/validation/validate.animal');

routes.get('/', animal.findAll);

routes.get('/record/:animal_id', animal.findOne);

routes.post(
    '/record',
    isAuthenticated,
    validator.saveAnimalRecord,
    animal.create
);

routes.put(
    '/record/:animal_id',
    isAuthenticated,
    validator.saveAnimalRecord,
    animal.update
);

routes.delete('/record/:animal_id', isAuthenticated, animal.delete);

module.exports = routes;
