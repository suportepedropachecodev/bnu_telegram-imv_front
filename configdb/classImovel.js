const sitemodel = require('./schemaImoveis');
const connection = require('./connections');
const mongoose = require('mongoose');
const moment = require('moment');

const today = moment().startOf('day');
let gte = today.toDate();
let lte = moment(today).endOf('day').toDate();

const classImovel = {
    start: async () => {
        connection();
    },
    add: async (dt) => {
        try {
            const dadosimoveis = new sitemodel({
                nome: dt.nome,
                valor: dt.valor,
                urlimovel: dt.urlimovel,
                codigo: dt.codigo,
                detalhesImovel: dt.detalhesImovel,
            });
            let dadosdeconsulta = await sitemodel.find({ codigo: dadosimoveis.codigo }).countDocuments();
            if (dadosdeconsulta === 0) {
                await dadosimoveis.save();
            } else {
                console.log('Dados já cadastrados!')
            }

        } catch (error) {
            console.log('Não foi salvar dados! => ' + error)
        }
    },
    contaregistros: async () => {
        try {
            let nrdados = await sitemodel.find({}).countDocuments();
        } catch (error) {
            console.log('Deu Pau!=> ' + error)
        }
    },
    
    consultadiaatual: async (dado) => {
        try {
            let alldados = [];
            let dadosdeconsulta = await sitemodel.find({
                createdAt: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate()
            } });
            
            let aserraspado = dadosdeconsulta.length;
            
            for (let i = 0; i < aserraspado; i++) {
                let indices = i;
                let name = (dadosdeconsulta[`${indices}`].nome);
                let vlr = (dadosdeconsulta[`${indices}`].valor);
                let uimovel = (dadosdeconsulta[`${indices}`].urlimovel);
                let cod = (dadosdeconsulta[`${indices}`].codigo);

                let resultado = `
                ---------------
                <b>${name}</b>
                <i>Valor:${vlr} </i>
                <i>Codigo:${cod} </i>
                <a href="${uimovel}">DETALHES</a>
                ---------------`
                //console.log(resultado)
                alldados.push(resultado)
                //return resultado
                
                
            }
            return alldados
            //console.log(alldados)
        } catch (error) {
            console.log('Deu Pau!=> ' + error)
        }
    },

    consulta: async (dado) => {
        try {
            let dadosdeconsulta = await sitemodel.find({ codigo: `${dado}` }).countDocuments();
            return dadosdeconsulta
        } catch (error) {
            console.log('Deu Pau!=> ' + error)
        }
    },
    close: async () => {
        mongoose.connection.close();
    }
};

module.exports = classImovel;