const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniquevalidator = require('mongoose-unique-validator');

const hospitalSechema = new Schema({ 
    nombre: { type: String, required: [true, 'El Nombre es Requerido'], unique: true },
    img: { type: String, required: false }, 
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, {
    timestamps: true, 
    collection: 'hospitales'
});

hospitalSechema.plugin(uniquevalidator, { message: '{PATH} debe de ser unico' }); 

module.exports = mongoose.model('Hospital', hospitalSechema); 
