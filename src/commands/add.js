const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adiciona uma URL de estudos ao notion.')
    .addStringOption(option =>
      option
        .setName('url')
        .setDescription('Insira aqui a URL desejada.')
        .setRequired(true)
    ),

  async execute(interaction) {
    const url = interaction.options.getString('url');

    const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirmar')
			.setStyle(ButtonStyle.Danger);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancelar')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(cancel, confirm);


    await interaction.reply({
      content: `Tem certeza de que deseja adicionar a URL: ${url}?`,
      components: [row]
    });

    const filter = i => i.customId === 'confirm' && i.user.id === interaction.user.id;
    console.log(filter);
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async () => {
      try {
        await axios.post('http://localhost:3000/urls', { url });
        await interaction.followUp('URL adicionada com sucesso!');
      } catch (error) {
        console.error(error);
        await interaction.followUp('Ocorreu um erro ao adicionar a URL.');
      } finally {
        collector.stop();
      }
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        interaction.followUp('Ação cancelada pelo usuário.');
      }
    });
  }

};
