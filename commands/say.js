const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('falar')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addStringOption((option) => option.setName('frase').setDescription('Frase para falar').setRequired(true))
		.setDescription('Force a linda Mayth a falar alguma coisa'),
	async execute(client, interaction) {
		var text = interaction.options.get("frase").value;

		interaction.reply({ content: "Sua fala foi executada!", ephemeral: true})
		interaction.channel.send({ content: text})
	},
};