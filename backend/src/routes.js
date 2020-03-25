const express = require('express');

const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.post('/casos', CasosController.create);
routes.get('/casos', CasosController.list);
routes.delete('/casos/:id', CasosController.delete);

routes.get('/profile', ProfileController.list);

module.exports = routes;