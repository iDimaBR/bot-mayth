const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('atividade')
		.setDescription('Retorna o tempo de execução'),
	async execute(client, interaction) {
		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

		const timeEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Tempo de atividade')
			.setDescription("Estou ativa há algum tempo, veja abaixo!")
			.addFields(
				{ name: 'Dias', value: days+"", inline: true },
				{ name: 'Horas', value: hours+"", inline: true },
				{ name: 'Minutos', value: minutes+"", inline: true },
				{ name: 'Segundos', value: seconds+"", inline: true },
			);

			await interaction.reply({ embeds: [ timeEmbed ] });
	},
};