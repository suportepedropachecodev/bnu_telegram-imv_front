require('dotenv').config();
const { Telegraf } = require('telegraf');
const classImovel = require('../configdb/classImovel');
const { Markup } = require('telegraf');

const tecladoData = Markup.keyboard(['📅 Hoje',]).resize()


const bot = new Telegraf(process.env.TOKEN);

const contaimoveis = async () => {
    await classImovel.start();
    let allimv = await classImovel.consultadiaatual();
    return allimv
}

const getimoveis = async () => {
    await classImovel.start();
    let allimv = await classImovel.consultadiaatual();
    return allimv
}

bot.start(async ctx => {
    const from = ctx.update.message.from
    console.log(from);
    await ctx.reply(`Seja bem vindo, ${from.first_name}`);
    await ctx.reply(`Clique no botão HOJE para ver imoveis adicionados hoje`, tecladoData);
});

bot.hears(/hoje/i, async ctx => {
    let result = await getimoveis()
    result.forEach(function (nome, i) {
        ctx.replyWithHTML(nome)
    })

});

bot.startPolling()