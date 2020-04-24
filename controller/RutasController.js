const rt= {};


rt.index = async(req, res) => {


     //=================================
    //    Usario Routes 
    //=================================
    
    var user = {
        get: '/user/all', 
        post: '/user',
        put: '/user/:id',
        delete: '/user:id',
    }
    
    var login = {post: '/login'}

    var hospital = {
        getAll: '/hospital',
        get: '/hospital/:id',
        post: '/hospital',
        put: '/hospital/:id',
        delete: '/hospital/:id',
    }

    var medico = {
        getAll: '/medico',
        get: '/medico/:id',
        post: '/medico',
        put: '/medico/:id',
        delete: '/medico/:id',
    }

    var busqueda = {
        get: '/busqueda/todo/:busqueda',
        get: '/busqueda/:coleccion/:busqueda',
       
    }

    var upload = '/upload/:tipo/:id';

    var getImg = '/getImage/:tipo/:img';



    res.status(200).send({
        ok: true,
        user,
        login, 
        hospital,
        medico, 
        busqueda,
        uploadimg: upload, 
        getImg


    })


}


module.exports = rt; 