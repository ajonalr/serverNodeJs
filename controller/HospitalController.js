const control = {};
const Hospital = require('../models/hospital');


control.index = async (req, res) => {
    try {
        // en la uer debe de venir el parametro desde 
        var desde = req.query.desde || 0,
            desde = Number(desde);

        await Hospital.find({}, async(err, hospital) => {
            if (err) return res.status(500).send({ ok: false, message: 'Error al cargar DB', err });
            if (!hospital) return res.status(500).send({ ok: false, message: 'No existen hospitales' });
           
            let total= 0;

            await Hospital.estimatedDocumentCount({}, (err, count) => total = count); 
           
            res.status(200).send({
                ok: true,
                hospital, 
                total
            });
        })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email');

    } catch (error) {
        res.send({ error });
    }

}

control.store = async (req, res) => {
    try {
        console.log(req.userToken);

        var { nombre, imagen } = req.body;


        const hospital = new Hospital({
            nombre,
            img: imagen,
            usuario: req.userToken
        });

        await hospital.save((err, hospital) => {
            if (err) return res.status(400).send({ ok: false, message: 'Error al guardar en la  DB', err });
            if (!hospital) return res.status(500).send({ ok: false, message: 'Algo Salio mal con el Hospital' });


            res.status(201).send({
                ok: true,
                message: 'Hospital Creado con exito',
                hospital
            });
        });



    } catch (e) {
        return res.send({ e });
    }
}

control.update = async (req, res) => {
    try {

        const id = req.params.id;
        var { nombre, imagen } = req.body;

        await Hospital.findById(id, async (err, hospital) => {

            if (err) return res.status(400).send({ ok: false, message: 'Error al recuper de la  DB', err });
            if (!hospital) return res.status(500).send({ ok: false, message: 'El hospital no existe' });

            hospital.nombre = nombre
            hospital.img = imagen
            hospital.usuario = req.userToken

            await hospital.save((err, hospitalSave) => {
                if (err) return res.status(400).send({ ok: false, message: 'Error al recuper de la  DB', err });
                if (!hospitalSave) return res.status(500).send({ ok: false, message: 'El hospital no existe' });

                res.status(200).send({
                    ok: true,
                    message: 'Hospital Actuzalizado con exito', 
                    hospitalSave
                });

            })
        })



    } catch (e) {
        res.send({
            e
        });
    }
}

control.remove = async (req, res) => {
    try {
        
        const id = req.params.id; 

        await Hospital.findById(id, async (err, hospital) => {
            if (err) return res.status(400).send({ ok: false, message: 'Error al recuper de la  DB', err });
            if (!hospital) return res.status(500).send({ ok: false, message: 'El hospital no existe' });

            await hospital.remove(id, (err, hospitalremove) => {
                if (err) return res.status(400).send({ ok: false, message: 'Error al eliminar en la base de datos', err });

                res.status(200).send({
                    ok: true,
                    message: 'Hospital eliminado con exito',
                    hospitalremove

                });
    
            })

        })

    } catch (e) {
        res.send({ e })
    }
}


module.exports = control; 
