const control = {};
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/auth.service');

control.login = async (req, res) => {

    const { email, password } = req.body;


    Usuario.findOne({ email: email }, (err, user) => {
        
        if (err) return res.status(500).send({ ok: false, message: 'Algo salio mal en la consulta', err });
        
        if (!user) return res.status(400).send({ ok: false, message: 'El Credenciales Incorrectas *email', err });
        
        if(!bcrypt.compareSync(password, user.password)) return res.status(400).send({ ok: false, message: 'El Credenciales Incorrectas *pass ' });
        user.password = '';   

        return res.status(200).send({
            ok: true,
            id: user._id,
            user, 
            token: tokenService.createToken(user)
        }); 

    });

}


module.exports = control;

