const express = require('express');
const router = express.Router();
const {
    Usuario,
    Login,
    Hospital,
    Medico,
    Busqueda,
    Upload,
    Imagen, Google } = require('../controller');

const Auth = require('../middleware/auth');

module.exports = (app) => {


    //=================================
    //    Usario Routes 
    //=================================
    router.get('/user/all', Auth.isauth, Usuario.index);
    router.post('/user', Usuario.store);
    router.put('/user/:id', Auth.isauth, Usuario.update);
    router.delete('/user/:id', Auth.isauth, Usuario.destroy);


    //=================================
    //    Login / Register
    //=================================
    router.post('/login', Login.login);



    //=================================
    //    Hospitales Rutas 
    //=================================
    const hos = '/hospital';
    router.get(hos, Auth.isauth, Hospital.index);
    router.post(hos, Auth.isauth, Hospital.store);
    router.put(hos + '/:id', Auth.isauth, Hospital.update);
    router.delete(hos + '/:id', Auth.isauth, Hospital.remove);

    //=================================
    //    Medicos Rutas 
    //=================================

    const med = '/medico'
    router.get(med, Auth.isauth, Medico.index);
    router.post(med, Auth.isauth, Medico.store);
    router.put(med + '/:id', Auth.isauth, Medico.update);
    router.delete(med + '/:id', Auth.isauth, Medico.remove);

    //=================================
    //    Busqueda Global 
    //=================================
    const bs = '/busqueda'
    router.get(bs + '/todo/:busqueda', Auth.isauth, Busqueda.index);
    router.get(bs + '/:coleccion/:busqueda', Auth.isauth, Busqueda.espesifica);


    //=================================
    //    Uploads 
    //=================================

    const up = '/upload'
    router.put(up + '/:tipo/:id', Auth.isauth, Upload.index);

    //=================================
    //
    //    Get imagen 
    //
    //=================================

    router.get('/getImage/:tipo/:img', Auth.isauth, Imagen.getImage)

    //=================================
    //
    //     loginn Google
    //
    //=================================

    router.post('/login/google', Google.singin)





    app.use(router);

}