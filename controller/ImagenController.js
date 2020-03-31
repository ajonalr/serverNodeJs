const control = {};
const path = require('path');
const fs = require('fs');


control.getImage = async (req, res) => {

    const tipo = req.params.tipo;
    const img = req.params.img;
    console.log(req.body.nombre);



    var pathimage = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

    console.log('Path Imagen', pathimage);


    if (fs.existsSync(pathimage)) {
        console.log('si existe');
        res.sendFile(pathimage);

    } else {
        console.log('no exite');

        let pathNoimage = path.resolve(__dirname, '../assets/no-img.jpg')
        res.sendFile(pathNoimage);
    }

}

module.exports = control;
