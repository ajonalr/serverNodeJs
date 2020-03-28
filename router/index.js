const express = require('express');
const router = express.Router(); 
const { Usuario } = require('../controller');

module.exports = (app) => {


    //=================================
    //    Usario Routes 
    //=================================
    router.get('/user/all', Usuario.index ); 
    router.post('/user', Usuario.store )




    app.use(router); 

}