const control = {};
const Medico = require('../models/medicos');



control.index = async (req, res) => {
    try {

        // en la uer debe de venir el parametro desde 
        var desde = req.query.desde || 0,
            desde = Number(desde);

        await Medico.find({},  async (err, medico) => {

            if (err) return res.status(500).send({ ok: false, message: 'Error al cargar DB', err });
            if (!medico) return res.status(500).send({ ok: false, message: 'No existen Medicos' });


            var total = 0; 

            await Medico.estimatedDocumentCount({}, (err, count) => total = count )

            res.status(200).send({
                ok: true,
                medico, 
                total
            });

        })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital');


    } catch (e) {
        res.send({ e });

    }
}

control.store = async (req, res) => {
    try {

        var { nombre, img, hospital } = req.body;

        const medico = new Medico({
            nombre,
            img,
            hospital,
            usuario: req.userToken
        });

        await medico.save((err, medico) => {

            if (err) return res.status(400).send({ ok: false, message: 'Error al guardar en la  DB', err });
            if (!medico) return res.status(500).send({ ok: false, message: 'Algo Salio mal con el Medico' });


            res.status(201).send({
                ok: true,
                message: 'Medico Creado con exito',
                medico
            });

        });



    } catch (e) {
        res.send({ e });
    }
}

control.update = async (req, res) => {

    const id = req.params.id;

    var { nombre, img, hospital } = req.body;

    await Medico.findById(id, async (err, medico) => {

        if (err) return res.status(400).send({ ok: false, message: 'Error al recuper de la  DB', err });
        if (!medico) return res.status(500).send({ ok: false, message: 'El medico no existe' });

        medico.nombre = nombre,
            medico.img = img;
        medico.hospital = hospital;

        await medico.save((err, medicoSave) => {
            if (err) return res.status(400).send({ ok: false, message: 'Error al recuper de la  DB', err });
            if (!medicoSave) return res.status(500).send({ ok: false, message: 'El Medico no existe' });

            res.status(200).send({
                ok: true,
                message: 'Medico Actuzalizado con exito',
                medicoSave
            });
        })


    });


}

control.remove = async (req, res) => {
    try {
        const id = req.params.id;

        await Medico.findById(id, async (err, medico) => {

            if (err) return res.status(400).send({ ok: false, message: 'Error al recuper de la  DB', err });
            if (!medico) return res.status(500).send({ ok: false, message: 'El medico no existe' });


            await medico.remove(id, (err, medico) => {
                if (err) return res.status(400).send({ ok: false, message: 'Error al eliminar en la base de datos', err });
    
                if (!medico) return res.status(500).send({ ok: false, message: 'El medico no existe en la base de datos' })
    
    
                res.status(200).send({
                    ok: true,
                    message: 'Medico eliminado con exito',
                    medico
                });
    
            })

        })
        
    } catch (e) {
        res.send({ e })
    }



}


module.exports = control;
