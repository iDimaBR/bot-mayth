const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('mayth')
		.setDescription('Retorna informações da Mayth'),
	async execute(client, interaction) {

		const embed = new EmbedBuilder()
			.setColor("#D5550D")
			.setTitle('Sobre a Mayth')
			.addFields(
				{ name: 'Nome', value: client.user.username + "#" + client.user.discriminator, inline: true},
				{ name: 'ID', value: client.user.id+"", inline: true},
				{ name: '\u200B', value: '\u200B', inline: true},
				{ name: 'Servidores', value: client.guilds.cache.size+"", inline: true},
				{ name: 'Versão do JS', value: process.version+"", inline: true }
			);

		await interaction.reply({ embeds: [ embed ] });
	},
};