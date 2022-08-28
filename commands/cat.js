const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require("snekfetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Imagem de gatinhu aleatório'),
	async execute(client, interaction) {

		let res;
		try {
			res = await get("https://aws.random.cat/meow");
			const cat = res.body.file;


			const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Meow! 🐱')
			.setImage(cat)

			await interaction.reply({ embeds: [ embed ] });
		} catch (err) {
			console.log(err)
			await interaction.reply({ content: "Não foi possível pegar a foto do gatinhu" , ephemeral: true });
		}
	},
};