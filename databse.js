const mongoose = require('mongoose');
const { databaseMongo } = require('./keys');

mongoose.connect(

    databaseMongo.uri,

    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

)

    .then(db => console.log('DB is conect'))
    .catch(err => console.error(err))