const routes = require('express').Router();
const household = require('../controllers/household');

const validator = require('../validation/validate.household');

routes.get('/', household.findAll);
routes.get('/complete', household.findAllComplete);
routes.get('/incomplete', household.findAllIncomplete);
routes.get('/record/:household_id', household.findOne);

routes.post('/record', validator.saveHouseholdRecord, household.create);

routes.put(
    '/record/:household_id',
    validator.saveHouseholdRecord,
    household.update
);

routes.delete('/record/:household_id', household.delete);

module.exports = routes;
