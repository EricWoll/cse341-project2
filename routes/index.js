const routes = require('express').Router();

const adoption_record = require('./adoption_record');
const animal = require('./animal');
const household = require('./household');

routes.use('/adoption_records', adoption_record);
routes.use('/animals', animal); // meed to complete Routes
routes.use('/household', household); // meed to complete Routes

const swagger = require('swagger-ui-express');
const swaggerDoc = require('../swagger/swagger-output.json');

routes.use('/api-docs', swagger.serve);
routes.get('/api-docs', swagger.setup(swaggerDoc));

module.exports = routes;
