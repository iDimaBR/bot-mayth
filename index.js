require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Client, Collection, GatewayIntentBits, ApplicationCommandType } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const swapActivityTime = 10000;
let currentActivity = 0;

client.once('ready', () => {
    console.log('Bot inicializado!');
    swapStatus();
    registerCommands();
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Ocorreu um erro ao executar esse comando :(', ephemeral: true });
	}
});

client.login(process.env.CLIENT_TOKEN);

function swapStatus(){
    setInterval(() => {
        const activities = [
            "amor para meus súditos",
            "Estou viva por " + getUpTime()
        ];
        
        client.user.setActivity(activities[currentActivity]);
        currentActivity++;
        if (currentActivity === activities.length) currentActivity = 0;
    }, swapActivityTime);
}

function registerCommands(){
    const commands = [];
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        command.data.type = ApplicationCommandType.ChatInput
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }

    client.application.commands.set(commands)
}

function getUpTime(){
    const uptime = [];

    let totalSeconds = (client.uptime / 1000);
	let days = Math.floor(totalSeconds / 86400);
    if(days > 0) uptime.push(days + "d");
	totalSeconds %= 86400;
	let hours = Math.floor(totalSeconds / 3600);
    if(hours > 0) uptime.push(hours + "h");
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
    if(minutes > 0) uptime.push(minutes + "m");
	let seconds = Math.floor(totalSeconds % 60);
    if(seconds > 0) uptime.push(seconds + "s");

    return uptime.join(" ");
}