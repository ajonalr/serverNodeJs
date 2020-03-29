const jwt = require('jwt-simple');
const moment = require('moment');
const { secret_Token } = require('../keys');

const auth = {};

auth.isauth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'no tienes autorizacion' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, secret_Token);

    // si la fecha de expiracion es menor al momento / tiempo actual 
    if (payload.exp <= moment().unix()) {
        res.status(401).send({ message: 'El Token A expirado' });
    }

    req.user = payload.usb; 

    next(); 

}

module.exports = auth;
