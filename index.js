const express = require('express');
const server = require('./server');
const app = server(express());

// database - hacemos el llamdo a la base de datos se inicia junto con la aplicacion

require('./databse');

// servidor - iniciamos el servidor
app.listen(app.get('port'), () => console.log('serven on port ' + app.get('port'))
);


