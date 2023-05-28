const { SlashCommandBuilder } = require("discord.js");


function vamoDebocharLegal() {
    const { mensagens }  = require("../mensagens");
    const indiceAleatorio = Math.floor(Math.random() * mensagens.length);
    
    return mensagens[indiceAleatorio];
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName("oi")
        .setDescription("verifique se o bot está funcionando corretamente."),
    async execute(interaction) {
        await interaction.reply(vamoDebocharLegal())
    }
}
