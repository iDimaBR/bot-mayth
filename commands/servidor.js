const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('servidor')
		.setDescription('Retorna informações do servidor'),
	async execute(client, interaction) {

		const guild = interaction;

		const { createdTimestamp, ownerId, description, } = guild;
		
		const server = client.guilds.cache.get(interaction.guild.id);
		const embed = new EmbedBuilder()
			.setColor("#D5550D")
			.setTitle('Informações do Servidor')
			.addFields(
				{ name: 'Nome', value: guild.name, inline: true }
			);

		await interaction.reply({ embeds: [ embed ] });
	},
};