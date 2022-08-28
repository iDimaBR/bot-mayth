const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Retorna pong'),
	async execute(client, interaction) {
		await interaction.reply({ content: 'Pong', ephemeral: true });
	},
};