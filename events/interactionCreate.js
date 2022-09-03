const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
    name: 'commandHandler',
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
        }
    },
}