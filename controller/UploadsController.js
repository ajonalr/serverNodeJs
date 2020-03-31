const control = {};
const moment = require('moment');
const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');


control.index = async (req, res) => {
    try {
        const tipo = req.params.tipo;
        const id = req.params.id;
        const colecciones = ['usuario', 'hospital', 'medico'];
        const extenvalid = ['jpg', 'png', 'jpeg', 'gif']


        if (!req.files) {
            res.status(500).send({ message: 'Debe de ingresar un aimagen' });
        }

        if (colecciones.indexOf(tipo) < 0) {
            res.status(500).send({ message: 'La coleccion no es valida' });
        }

        const image = req.files.imagen;
        const imageExtencion = image.name.split('.');
        const imagenNewExtencion = imageExtencion[imageExtencion.length - 1]


        if (extenvalid.indexOf(imagenNewExtencion) < 0) {
            res.status(500).send({ message: 'No es un archivo permitido, permitidos: ' + extenvalid.join(', ') });
        }

        const imageName = `${id}-${moment().unix()}${new Date().getMilliseconds()}.${imagenNewExtencion}`;

        // mover el archivo del temporal al especifico
        // console.log(image);

        const path = `./uploads/${tipo}/${imageName}`

        image.mv(path, err => {
            if (err) {
                res.status(500).send({ message: 'Error al mover Archivo', err });
            }

            subirportipo(tipo, id, imageName, res);

        });


    } catch (error) {
        res.status(500).send({ ok: false, error });
    }

}


async function subirportipo(coleccion, id, nombrearchivo, res) {


    //=================================
    //    Asiganacion de la imagen apar el usuario
    //=================================

    if (coleccion === 'usuario') {
        await Usuario.findById(id, async (err, usuario) => {
            var pathViejo = './uploads/usuario/' + usuario.img;
            fs.exists(pathViejo, (exists) => {
                if (exists) {
                    console.log('Si existe la imagen');
                    fs.unlinkSync(pathViejo);
                } else {
                    console.log('nop existe la imagen');
                }
            });

            usuario.img = nombrearchivo;
            await usuario.save((err, useractualizado) => {
                useractualizado.password = '';
                return res.status(200).send({
                    ok: true,
                    message: 'Imagen de Usuario actualizado',
                    usuario: useractualizado
                });
            });
            // console.log('img: vieja: ' + usuario.img);
        });

    }

    //=================================
    //    Asignacin de imagen para medico 
    //=================================

    if (coleccion === 'medico') {

        await Medico.findById(id, async (err, medico) => {

            var pathViejo = './uploads/medico/' + medico.img;
            fs.exists(pathViejo, (exists) => {
                if (exists) {
                    console.log('Si existe la imagen');
                    fs.unlinkSync(pathViejo);
                } else {
                    console.log('nop existe la imagen');
                }
            });

            medico.img = nombrearchivo;

            await medico.save((err, medicoupdate) => {

                return res.status(200).send({
                    ok: true,
                    message: 'Imagen de Usuario actualizado',
                    medico: medicoupdate
                });

            })

        });


    }

    //=================================
    //
    //    asignacion de imagen para el hoptal 
    //
    //=================================

    if (coleccion === 'hospital') {

        await Hospital.findById(id, (err, hospital) => {

            var pathViejo = './uploads/hospital/' + hospital.img;
            fs.exists(pathViejo, (exists) => {
                if (exists) {
                    console.log('Si existe la imagen');
                    fs.unlinkSync(pathViejo);
                } else {
                    console.log('nop existe la imagen');
                }
            });

            hospital.img = nombrearchivo; 

            hospital.save((err, hospitalupdate) => {

                return res.status(200).send({
                    ok: true,
                    message: 'Imagen de Usuario actualizado',
                    hospital: hospitalupdate
                });

            });
        });
    }

}


module.exports = control; 
