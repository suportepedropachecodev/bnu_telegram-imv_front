const mongoose = require('mongoose');
require('dotenv').config();

function connection() {
    const userdb = process.env.USUARIODB
    const passdb = process.env.SENHADB
    const URL = `mongodb+srv://${userdb}:${passdb}@cluster0.eawcj.mongodb.net/olx-bnu-diario?retryWrites=true&w=majority`;


    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', () => {
        return error
    });

    db.on('open', () => {
        return 'CONEXAO COM SUCESSO!'
        
    });
};
module.exports = connection;
