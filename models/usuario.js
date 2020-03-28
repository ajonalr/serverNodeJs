const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const roles_validos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'], 
    message: '{VALUE} no es un rol permitido'
}


const usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El Nombre es Requerido'] }, 
    email: { type: String, required: [true, 'El correo es requerido'], unique: true },
    password: { type: String, required: true }, 
    img: { type: String, required: false },
    role: { type: String, required: true,  default: 'USER_ROLE', enum: roles_validos }
});

usuarioSchema.plugin(uniquevalidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Usuario', usuarioSchema); 
