const control = {};
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/auth.service');

control.login = async (req, res) => {

    const { email, password } = req.body;


    Usuario.findOne({ email: email }, (err, user) => {

        if (err) return res.status(500).send({ ok: false, message: 'Algo salio mal en la consulta', err });

        if (!user) return res.status(400).send({ ok: false, message: 'El Credenciales Incorrectas *email', err });

        if (!bcrypt.compareSync(password, user.password)) return res.status(400).send({ ok: false, message: 'El Credenciales Incorrectas *pass ' });
        user.password = '';

        return res.status(200).send({
            ok: true,
            id: user._id,
            user,
            token: tokenService.createToken(user),
            menu: obtenerMenu(user.role)
        });

    });

}

function obtenerMenu(ROLE) {

    menu = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dasboard' },
                { titulo: 'PregressBar', url: '/progress' },
                { titulo: 'Graficas 1', url: '/graficas1' },
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [

                { titulo: 'Medicos', url: '/medicos' },
                { titulo: 'Hospitales', url: '/hospitales' },
            ]
        }

    ];

    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
    }

    return menu;

}


module.exports = control;

