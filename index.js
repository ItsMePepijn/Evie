//Importing libraries
const fs = require('fs');
const Discord = require('discord.js');

//Client setup
const {client} = require('./client')
client.commands = new Discord.Collection();

//Commands setup
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`[COMMAND HANDLER] - ${file} has been loaded`);
    client.commands.set(command.name, command);
}

//Events setup
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
    console.log(`[EVENT HANDLER] - ${file} has been loaded`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const {token} = require('./config.json');
client.login(token);