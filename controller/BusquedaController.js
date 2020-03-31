const control = {};
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');
const Usuario = require('../models/usuario');


control.index = async (req, res) => {


    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    // ejecuta todas las promesasr en paralelo 

    await Promise.all([

        buscarHopital(busqueda, regex),
        buscarMedico(busqueda, regex),
        buscarUsuarios(regex)

    ]).then(response => {
        res.status(200).send({
            ok: true,
            hospital: response[0],
            medico: response[1],
            usuario: response[2]
        });

    });

}


control.espesifica = async (req, res) => {

    var coleccion = req.params.coleccion;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda);

    var promesa;
    switch (coleccion) {
        case 'medico':

            promesa = buscarMedico(busqueda, regex);

            break;
        case 'hospital':

            promesa = buscarHopital(busqueda, regex);

            break;
        case 'usuario':

            promesa = buscarUsuarios(regex);

            break;

        default:
            res.send({ message: 'No exite una Colecion con el nombre ' + coleccion })
            break;
    }

    promesa.then(response => {
        res.status(200).send({
            ok: true,
            [coleccion]: response
            
        });
    })


}

function buscarHopital(busqueda, regex) {
    return new Promise((resolve, reject) => {

        Hospital.find({ nombre: regex }, (err, hospital) => {
            if (err) { reject('Error Al cargar Hospitales', err); }
            else { resolve(hospital); }
        })
            .populate('usuario', 'nombre email role');


    });
}

function buscarMedico(busqueda, regex) {
    // retornamos un promesa 
    return new Promise((resolve, reject) => {
        Medico.find({ nombre: regex }, (err, medico) => {
            if (err) { reject('Error Al cargar Medicos', err); }
            else { resolve(medico); }
        })
            .populate('usuario', 'nombre email role')
            .populate('hospital');
    });
}

function buscarUsuarios(regex) {
    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role')
            .or([{ nombre: regex }, { email: regex }])
            .exec((err, usuario) => {
                if (err) { reject('Error al cargar Usuarios', err); }
                else { resolve(usuario); }
            });
    });
}



module.exports = control


