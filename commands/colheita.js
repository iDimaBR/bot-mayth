const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('colheita')
		.addUserOption((option) => option.setName('usuario').setDescription('Digite abaixo o usuário que deseja ver a colheita').setRequired(false))
		.setDescription('Visualiza sua colheita ou de outro membro'),
	async execute(client, interaction) {

		var author = interaction.user;
		var target = interaction.options.get("usuario");

		var member;
		if(target == null){
			member = author;
		}else{
			member = target.user;
		}

		var morangos = await client.db.get("morangos_" + member.id+"");
		var melancias = await client.db.get("melancias_" + member.id+"");

		if(morangos == null) morangos = 0;
		if(melancias == null) melancias = 0;
		

		const embed = new EmbedBuilder()
			.setColor("#874848")
			.setTitle("Cesta de " + member.username)
			.setThumbnail(member.displayAvatarURL({ size: 2048, dynamic: true }))
			.addFields(
				{ name: 'Morangos', value: "🍓 " + morangos, inline: true },
				{ name: 'Melancias', value: "🍉 " + melancias, inline: true }
			);

		await interaction.reply({ embeds: [ embed ] });
	},
};