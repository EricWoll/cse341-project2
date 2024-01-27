const routes = require('express').Router();
const swagger = require('swagger-ui-express');
const swaggerDoc = require('../swagger/swagger-output.json');

/*
    'require' routes here
*/

/*
    'use' required routes here
*/

routes.use('/api-docs', swagger.serve);
routes.get('/api-docs', swagger.setup(swaggerDoc));

module.exports = routes;
