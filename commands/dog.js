const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require("snekfetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Imagem de doguinho aleatório'),
	async execute(client, interaction) {

		let res;
		try {
			res = await get("https://random.dog/woof");
			const dog = res.raw.toString();
			
			const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Woof! 🐶')
			.setImage("https://random.dog/" + dog)

			await interaction.reply({ embeds: [ embed ] });
		} catch (err) {
			console.log(err)
			await interaction.reply({ content: "Não foi possível pegar a foto do doguinho" , ephemeral: true });
		}
	},
};