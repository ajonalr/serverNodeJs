const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const uniqueval = require('mongoose-unique-validator');


const medicoShema = new Schema({
    nombre: { type: String, required: true },
    img: { type: String, required: false }, 
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }, 
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital' }
},{
    timestamps: true
});

medicoShema.plugin(uniqueval, {message: '{PATH} debe de ser unico'})

module.exports = mongoose.model('Medico', medicoShema);
