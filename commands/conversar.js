const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { get } = require("snekfetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('conversar')
		.addStringOption((option) => option.setName('conversar').setDescription('Digite uma frase para Mayth').setRequired(true))
		.setDescription('Converse com a Mayth'),
	async execute(client, interaction) {
		var text = interaction.options.get("conversar").value;
		var textEncoded = encodeURIComponent(text).replace('%20','+');

		try {
			res = await get("https://api.simsimi.net/v2/?text=" + textEncoded + "&lc=pt");
			const answer = res.body.success;

			await interaction.reply({ content: text + "\n**Resposta:** " + answer });
		} catch (err) {
			await interaction.reply({ content: text + "\n**Resposta:** Não entendi meu lindo"});
		}
	},
};
