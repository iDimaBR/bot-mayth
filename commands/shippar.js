const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shippar')
		.addUserOption((option) => option.setName('shippe').setDescription('Digita o @ ai').setRequired(true))
		.setDescription('Shippe com outro usuário'),
	async execute(client, interaction) {

		var author = interaction.user.username;
		var target = interaction.options.get("shippe").user.username;
		const shipName = `${author.substring(0, 4)}${target.slice(-4)}`.toLowerCase();
		
		await interaction.reply({ content: "Chegou **" + capitalize(shipName) + "**, o canal mais quente do ano para abalar o servidor! Parabéns " + author + " por conquistar " + target + " ;)" });
	},
};

function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}