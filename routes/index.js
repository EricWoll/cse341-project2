const routes = require('express').Router();

const adoption_record = require('./adoption_record');
const animal = require('./animal');
const household = require('./household');

routes.use('/adoption-records', adoption_record);
routes.use('/animals', animal);
routes.use('/households', household);

routes.use('/', require('./api-docs'));

module.exports = routes;
