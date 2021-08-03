const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    nome: String,
    valor: String,
    urlimovel: String,
    codigo: String,
    detalhesImovel: [{ type: String }]
});

const imoveis = mongoose.model('Imoveis', schema);

module.exports = imoveis;