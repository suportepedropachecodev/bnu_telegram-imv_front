require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TOKEN);

bot.start(async ctx => {
    const from = ctx.update.message.from
    await ctx.reply(`Seja bem vindo, ${from.first_name}`);
});

bot.startPolling()