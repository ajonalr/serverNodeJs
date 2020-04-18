const control = {};
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

control.index = async (req, res) => {

    try {

        // console.log(req.userToken);
        // en la uer debe de venir el parametro desde 
        var desde = req.query.desde || 0,
            desde = Number(desde);



        await Usuario.find({}, 'nombre email img role')
            .skip(desde)
            .limit(5)
            .exec(
                async (err, usuario) => {
                    if (err) return res.status(500).send({ ok: false, message: 'Error al cargar DB', err });
                    if (!usuario) return res.status(500).send({ ok: false, message: 'No existen usuarios' });


                    var total = 0;

                    await Usuario.estimatedDocumentCount({}, (err, count) => {
                        total = count
                    })

                    res.status(200).send({
                        ok: true,
                        usuario,
                        total
                    });


                }
            );
    } catch (e) {
        console.error(e);

    }

}

control.store = async (req, res) => {
    try {
        //recojemos lo datos que vienen en el cuerpo de la peticon 
        var { nombre, email, password, img, role } = req.body;

        const usuario = new Usuario({
            nombre,
            email,
            password: bcrypt.hashSync(password, 10),
            img,
            role
        });



        await usuario.save((err, user) => {

            if (err) return res.status(400).send({ ok: false, message: 'Error al guardar en la  DB', err });
            if (!user) return res.status(500).send({ ok: false, message: 'Algo Salio mal' });

            user.password = '';
            res.status(201).send({
                ok: true,
                message: 'Usario Creado con exito',
                user
            });
        });
    } catch (e) {
        console.error(e);

    }
}

control.update = async (req, res) => {
    try {
        const id = req.params.id;
        var { nombre, email, password, img, role } = req.body;

        await Usuario.findById(id, (err, user) => {
            if (err) return res.status(500).send({ ok: false, message: 'Error al al buscar Usuario', err });

            if (!user) return res.status(400).send({ ok: false, message: 'El usuario no existe' });

            user.nombre = nombre
            user.email = email
            user.role = role
            user.img = img


            user.save((err, usersave) => {
                if (err) return res.status(400).send({ ok: false, message: 'Error al actualizar en la  DB', err });
                if (!usersave) return res.status(500).send({ ok: false, message: 'Algo Salio mal' });

                // usersave.password = '';

                res.status(200).send({
                    ok: true,
                    message: 'Usuario Actuzalizado con exito',
                    user: usersave
                });
            });
        });

    } catch (e) {
        return res.send({ error: e });
    }
}

control.destroy = async (req, res) => {
    try {

        const id = req.params.id;

        await Usuario.findById(id, async (err, user) => {
            if (err) return res.status(400).send({ ok: false, message: 'Error al bucar el usuario en la  DB', err });
            if (!user) return res.status(500).send({ ok: false, message: 'No existe ningun usuario con el id:' + id });

            await user.remove(id, (err) => {
                if (err) return res.status(400).send({ ok: false, message: 'Error al eliminar en la base de datos', err });
            });

            res.status(200).send({
                ok: true,
                message: 'Usuario eliminado con exito',
                user
            });

        });


    } catch (e) {
        res.send({ e })
    }
}



module.exports = control; 
