const jwt = require('jwt-simple');
const Usuario = require('../models/usuario');
const moment = require('moment');
const { secret_Token, hourToken } = require('../keys');

const service = {}
service.createToken = (user) => {

    //=================================
    //    creamos el token recibiendo el id del usuario
    //    sub: id, iat: feca de creacion, exp: creacion del token
    //=================================
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(hourToken, 'hour').unix()
    }
    return jwt.encode(payload, secret_Token);
 
}

module.exports = service; 
