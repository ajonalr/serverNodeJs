module.exports = {

    port: process.env.PORT || 4100,

    databaseMongo: {

        uri: 'mongodb://localhost:27017/nombreDB'

    }, 

    secret_Token: 'misecretToken'

}