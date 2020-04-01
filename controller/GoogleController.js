const control = {};
const { google_cliente_id } = require('../keys');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(google_cliente_id);
const Usuario = require('../models/usuario');
const tokenService = require('../services/auth.service');




control.singin = async (req, res) => {

    // esta variable token  es temporal para veridicariion (toke)

    var token = req.body.token;

    var googleuser = await verify(token)
        .catch(err => {
            res.send({ ok: false, err, message: 'Token invalido' })
        })

    Usuario.findOne({ email: googleuser.email }, (err, user) => {

        if (err) {
            res.status(500).send({ ok: false, message: 'Erros al buscar usuario', err })
        }


        if (user) {
            if (user.google === false) {
                res.status(400).send({ ok: false, message: 'Debe de usar su authenticacion normal' })
            } else {
                return res.status(200).send({
                    ok: true,
                    user,
                    toke: tokenService.createToken(user)
                });
            }
        } else {
            // el usuario no existe, ahy que registrar en la db

            var usuario = new Usuario({

                nombre: googleuser.nombre,
                email: googleuser.email,
                img: googleuser.img,
                google: true,
                password: ':)',
                // la contraseña no se hashea asi que no podra der accedida
            });

            usuario.save((err, userSave) => {

                if (err) return res.status(400).send({ ok: false, message: 'Error al guardar en la  DB', err });
                if (!userSave) return res.status(500).send({ ok: false, message: 'Algo Salio mal' });

                
                res.status(201).send({
                    ok: true,
                    userSave  ,
                    toke: tokenService.createToken(user)
                });

            })

        }

    })




}


async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: google_cliente_id,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}


module.exports = control; 
