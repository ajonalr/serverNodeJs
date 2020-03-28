const control = {};
const Usuario = require('../models/usuario');

control.index = async (req, res) => {

    try {
        await Usuario.find({} , 'nombre email img role')
            .exec(
                (err, usuarios) => {
                    if (err) return res.status(500).send({ ok: false, message: 'Error al cargar DB', err });
                    if (!usuarios) return res.status(500).send({ ok: false, message: 'No existen usuarios' });
                    res.status(200).send({
                        ok: true,
                        usuarios
                    });
                }
            );
    } catch (e) {
        console.error(e);

    }

}

control.store = async (req, res ) => {
    try {
        //recojemos lo datos que vienen en el cuerpo de la peticon 
    var { nombre, email, password, img, role  } = req.body; 

    const usuario = new Usuario({
        nombre,
        email,
        password, 
        img, 
        role
    }); 

    

    await usuario.save( (err, user) => {

        if (err) return res.status(500).send({ ok: false, message: 'Error al guardar en la  DB', err });
        if (!user) return res.status(500).send({ ok: false, message: 'Algo Salio mal' });
        res.status(201).send({
            ok: true,
            user
        });
    });
    } catch (e) {
        console.error(e);
        
    }
}




module.exports = control; 
