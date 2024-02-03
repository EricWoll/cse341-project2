const routes = require('express').Router();
const record = require('../controllers/adoption_record');
const { isAuthenticated } = require('../middleware/authenticate');

const validator = require('../middleware/validation/validate.adoption-records');

routes.get('/', record.findAll);
routes.get('/complete', record.findAllComplete);
routes.get('/incomplete', record.findAllIncomplete);
routes.get('/record/:adoption_id', record.findOne);

routes.get('/animal/:animal_id', record.findAnimal);
routes.get('/household/:household_id', record.findHousehold);

routes.post(
    '/record',
    isAuthenticated,
    validator.saveAdoptionRecord,
    record.create
);

routes.put(
    '/record/:adoption_id',
    isAuthenticated,
    validator.saveAdoptionRecord,
    record.update
);

routes.delete('/record/:adoption_id', isAuthenticated, record.delete);

module.exports = routes;
