const routes = require('express').Router();
const passport = require('passport');

const adoption_record = require('./adoption_record');
const animal = require('./animal');
const household = require('./household');

routes.use('/adoption-records', adoption_record);
routes.use('/animals', animal);
routes.use('/households', household);

routes.use('/', require('./api-docs'));

routes.get(
    '/login',
    passport.authenticate('github'),
    (req, res) => {}
    /*
        #swagger.tags=['Authentication']
        #swagger.summary="Logs the User in"
    */
);
routes.get(
    '/logout',
    (req, res, next) => {
        req.logout((error) => {
            if (error) {
                res.redirect('/api-docs');
            }
        });
        res.redirect('/');
    }
    /*
        #swagger.tags=['Authentication']
        #swagger.summary="Logs the User out"
    */
);

module.exports = routes;
