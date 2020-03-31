const morgar = require('morgan');
const bodyparser = require('body-parser');
const routes = require('../router');
const cors = require('cors');
const { port } = require('../keys');
const fileUpload = require('express-fileupload');





module.exports = (app) => {


    // cors - Para admitrir conecciones de otros servidores

    app.use(cors());

    // settings - Configuraciones de Servidor

    app.set('port', port);

    // middelware - Se ejecturan antes de toda peticion

    app.use(morgar('dev'));

    app.use(bodyparser.urlencoded({ extended: false }));

    app.use(bodyparser.json());

    //para la subida de archivos
    app.use(fileUpload())



    //rutas para poder acceder a las peticiones
    routes(app);


    // retornamos app
    return app;

}
