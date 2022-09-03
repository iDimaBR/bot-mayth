const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require("snekfetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('Retorna informações sobre o github informado')
		.addStringOption((option) => option.setName('usuario').setDescription('Usuário').setRequired(true)),
	async execute(client, interaction) {

		var username = interaction.options.get("usuario").value;

		let res;
		try {
			result = await get("https://api.github.com/users/" + username);
		
			console.log(result.body);

			let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = result.body;

			const github = result.body;
			console.log(github.login)

			const embed = new EmbedBuilder()
				.setColor("#18CEDD")
				.setThumbnail(avatar_url)
				.setTitle("Github do(a) " + github.login)
				.addFields(
					{ name: 'ID', value: github.id+""},
					{ name: 'Nome', value: github.name+""},
					{ name: 'Biografia', value: github.bio+""},
					{ name: 'Repositórios', value: github.public_repos+"", inline: true},
					{ name: 'Seguidores', value: github.followers+"", inline: true},
					{ name: 'Seguindo', value: github.following+"", inline: true},
					{ name: 'Gists', value: github.public_gists+"", inline: true},
					{ name: 'Localização', value: github.location+"", inline: true},
					{ name: 'Link', value: github.html_url+""}
				);

			await interaction.reply({ embeds: [ embed ] });
		} catch (err) {
			console.log(err);
			await interaction.reply({ content: "Não foi possível pegar informações do github." , ephemeral: true });
		}
	},
};