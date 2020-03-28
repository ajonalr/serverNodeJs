module.exports = {

    port: process.env.PORT || 4100,

    databaseMongo: {

        uri: 'mongodb://localhost:27017/hospital'

    }, 

    secret_Token: 'misecretToken'

}