const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require("snekfetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nsfw')
		.setDescription('Receba sua waifu aleatória')
		.addStringOption(option =>
			option.setName('tipo')
				.setDescription('Defina a categoria da imagem +18')
				.setRequired(true)
				.addChoices(
					{ name: 'Waifu', value: 'waifu' },
					{ name: 'Neko', value: 'neko' },
					{ name: 'Trap', value: 'trap' },
					{ name: 'Blowjob', value: 'blowjob' },
				)),
	async execute(client, interaction) {

		const type = interaction.options.getString('tipo');

		let res;
		try {
			res = await get("https://api.waifu.pics/nsfw/" + type);
			const waifu = res.body.url;

			const titles = [
				"O que acha de mim?",
				"Aposto que você goza primeiro >.>",
				"Vamos brinca de 69?"
			];


			const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(titles[Math.floor(Math.random() * titles.length)])
			.setImage(waifu)

			await interaction.reply({ embeds: [ embed ] });
		} catch (err) {
			await interaction.reply({ content: "Não foi possível pegar a foto +18" , ephemeral: true });
		}
	},
};