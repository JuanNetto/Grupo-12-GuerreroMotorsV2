let express = require('express');
let routers = express.Router();
let controllers = require("../controllers/controllers");


routers.get('/',controllers.home);

routers.get('/list',controllers.list);

routers.get('/login',controllers.login);
routers.post('/login',controllers.loginPost);

routers.get('/signup',controllers.signup);
routers.post('/signup',controllers.signupPost);

routers.get('/editar',controllers.editar);

routers.get('/editar/:id',controllers.editarAuto);
routers.post('/editar/:id',controllers.editarPost);

routers.get('/agregar',controllers.agregar);
routers.post('/agregar',controllers.agregarPost);

module.exports = routers;