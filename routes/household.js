const routes = require('express').Router();
const household = require('../controllers/household');
const { isAuthenticated } = require('../middleware/authenticate');

const validator = require('../middleware/validation/validate.household');

routes.get('/', household.findAll);
routes.get('/complete', household.findAllComplete);
routes.get('/incomplete', household.findAllIncomplete);
routes.get('/record/:household_id', household.findOne);

routes.post(
    '/record',
    isAuthenticated,
    validator.saveHouseholdRecord,
    household.create
);

routes.put(
    '/record/:household_id',
    isAuthenticated,
    validator.saveHouseholdRecord,
    household.update
);

routes.delete('/record/:household_id', isAuthenticated, household.delete);

module.exports = routes;
