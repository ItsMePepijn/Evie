//Importing libraries
const db = require('quick.db');
const fs = require('fs');
const Discord = require('discord.js');

const pfx = db.get('prefix');

//Client setup
const DIF = Discord.Intents.FLAGS
const client = new Discord.Client({ intents: [
    DIF.GUILDS, 
    DIF.GUILD_MESSAGES, 
    DIF.GUILD_BANS,
    DIF.GUILD_MEMBERS,
    DIF.DIRECT_MESSAGES,
    DIF.GUILD_INTEGRATIONS
], 
partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();

//Commands setup
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(__dirname + `/commands/${file}`);
    console.log('[COMMAND HANDLER]' + ' - ' + `${file} has been loaded`);
    client.commands.set(command.name, command);
}

//On ready
client.on('ready', () => {
    console.log(`${client.user.displayName} Has logged in!`);
    status();
    setInterval(status, 600000);
    
    db.set('prefix', '!')
});

//Config setup
const {token} = require(__dirname + '/config.json');

//Command handler
client.on('messageCreate', message => {
    const args = message.content.slice(pfx.length).trim().split(' ');

    if (!message.content.startsWith(pfx) || message.author.bot || !message.guild) return;
    const command = args.shift().toLowerCase();

    const file = client.commands.get(command);
    if(file) file.execute(message, args, client);
});

client.on('guildMemberAdd', member => { 
    console.log(`${member.displayName} joined the server!`)
});

function status(){
    client.user.setPresence({ activities: [{ name: 'all the lil mushrooms', type: 'WATCHING' }], status: 'dnd' });
}

client.login(token);