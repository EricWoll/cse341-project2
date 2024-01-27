const routes = require('express').Router();
const record = require('../controllers/adoption_record');

routes.get('/', record.findAll); // add controller
routes.get('/complete', record.findAllComplete); // add controller
routes.get('/incomplete', record.findAllIncomplete); // add controller
routes.get('/:adoption_id', record.findOne); // add controller

routes.post('/', record.create);

routes.put('/', record.update); // add controller

routes.delete('/', record.delete); // add controller

module.exports = routes;
