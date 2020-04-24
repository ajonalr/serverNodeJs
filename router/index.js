const express = require('express');
const router = express.Router();
const {
    Usuario,
    Login,
    Hospital,
    Medico,
    Busqueda,
    Upload,
    Imagen, 
    Google, 
    Ruta } = require('../controller');

const Auth = require('../middleware/auth');

module.exports = (app) => {


    //=================================
    //    Usario Routes 
    //=================================
    router.get('/user/all', Usuario.index);
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
    router.get(hos, Hospital.index);
    router.get(hos +'/:id', Hospital.get);
    router.post(hos, Auth.isauth, Hospital.store);
    router.put(hos + '/:id', Auth.isauth, Hospital.update);
    router.delete(hos + '/:id', Auth.isauth, Hospital.remove);

    //=================================
    //    Medicos Rutas 
    //=================================

    const med = '/medico'
    router.get(med, Medico.index);
    router.get(med + '/:id', Medico.get);
    router.post(med, Auth.isauth, Medico.store);
    router.put(med + '/:id', Auth.isauth, Medico.update);
    router.delete(med + '/:id', Auth.isauth, Medico.remove);

    //=================================
    //    Busqueda Global 
    //=================================
    const bs = '/busqueda'
    router.get(bs + '/todo/:busqueda', Busqueda.index);
    router.get(bs + '/:coleccion/:busqueda', Busqueda.espesifica);


    //=================================
    //    Uploads image
    //=================================

    const up = '/upload'
    router.put(up + '/:tipo/:id', Upload.index);

    //=================================
    //
    //    Get imagen 
    //
    //=================================

    router.get('/getImage/:tipo/:img', Imagen.getImage)

    //=================================
    //
    //     loginn Google
    //
    //=================================

    router.post('/login/google', Google.singin)


    //=====================================================
    //=====================================================
    //   rutas
    //=====================================================
    //=====================================================

    router.get('/rutas', Ruta.index )



    app.use(router);

}