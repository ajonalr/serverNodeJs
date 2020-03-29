const express = require('express');
const router = express.Router();
const { Usuario, Login } = require('../controller');
const Auth = require('../middleware/auth');
module.exports = (app) => {


    //=================================
    //    Usario Routes 
    //=================================
    router.get('/user/all', Auth.isauth, Usuario.index);
    router.post('/user', Auth.isauth, Usuario.store);
    router.put('/user/:id', Auth.isauth, Usuario.update);
    router.delete('/user/:id', Auth.isauth, Usuario.destroy);


    //=================================
    //    Login / Register
    //=================================
    router.post('/login', Login.login);






    app.use(router);

}