const express = require('express');
const router = express.Router(); 


module.exports = (app) => {


    // home

    router.get('/', (req, res) => {
        res.send({ message: 'Hola mundo' }); 
    });



    app.use(router); 

}