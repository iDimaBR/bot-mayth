const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('limpar')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addIntegerOption((option) => option.setName('quantidade').setDescription('Quantidade para limpar').setRequired(true))
		.setDescription('Limpa mensagens do chat'),
	async execute(client, interaction) {

		const channelID = interaction.channelId;
		const channel = client.channels.cache.get(channelID);

		var limit = interaction.options.get("quantidade");

		channel.messages.fetch({ limit: limit.value }).then(messages => {
			messages.forEach(msg => 
				msg.delete()
			)

			interaction.reply(
				{ content: 'O chat teve ' + messages.size + " mensagens deletadas.", ephemeral: true }
			)
		})
	},
};