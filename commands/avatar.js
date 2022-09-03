const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.addUserOption((option) => option.setName('usuario').setDescription('Digite o usuário que deseja pegar o avatar.').setRequired(false))
		.setDescription('Pega o avatar de um usuário'),
	async execute(client, interaction) {

		var author = interaction.user;
		var target = interaction.options.get("usuario");

		var member;
		if(target == null){
			member = author;
		}else{
			member = target.user;
		}
		
		
		const embed = new EmbedBuilder()
			.setColor("#874848")
			.setTitle("Avatar de " + member.username + "#" + member.discriminator)
    		.setImage(member.displayAvatarURL({ size: 2048, dynamic: true }));

			await interaction.reply({ embeds: [ embed ] });
		},
};

function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}