require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Client, Collection, GatewayIntentBits, ApplicationCommandType } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);
const client = new Client({ intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
] });
const { QuickDB } = require('quick.db');

const swapActivityTime = 10000;
let currentActivity = 0;

const db = new QuickDB();
client.db = db;
client.once('ready', () => {
    console.log('Bot inicializado!');
    swapStatus();
    registerCommands();
    registerEvents();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
		console.error(error);
	}
});

client.on("messageCreate", async function(message){
    if(message.type != 0) return;
    if(message.author.bot) return;

    const value = Math.floor(Math.random() * 100);

    if(Math.random() < 0.07){
        const author = message.author.id;
        await db.add("morangos_" + author, value)
        message.author.send({content: "Você colheu **" + value + " morangos**, quem sabe não dá pra fazer uma torta deliciosa?", ephemeral: true})
        return;
    }

    if(Math.random() < 0.038){
        const author = message.author.id;
        await db.add("melancias_" + author, value)
        message.author.send({content: "Você colheu **" + value + " melancias**, estão tãããão fofinhasss", ephemeral: true})
        return;
    }
});
client.login(process.env.CLIENT_TOKEN);

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
function registerEvents(){
    client.events = new Collection();
    const eventsPath = path.join(__dirname, 'events');
    const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    
    for (const file of eventsFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        client.once(event.name, (...args) => event.execute(...args, client));
        client.events.set(event.name, event);
    }
    console.log(client.events)
}
function swapStatus(){
    client.user.setStatus('online');
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