const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require("snekfetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('waifu')
		.setDescription('Receba sua waifu aleatória'),
	async execute(client, interaction) {

		let res;
		try {
			res = await get("https://api.waifu.pics/sfw/waifu");
			const waifu = res.body.url;

			const titles = [
				"Onii-chan :3",
				"Posso ser sua esposa? w.w",
				"Estou com frio nii-san"
			];


			const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(titles[Math.floor(Math.random() * titles.length)])
			.setImage(waifu)

			await interaction.reply({ embeds: [ embed ] });
		} catch (err) {
			console.log(err)
			await interaction.reply({ content: "Não foi possível pegar a foto da waifu" , ephemeral: true });
		}
	},
};