const Discord = require('discord.js')

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

exports.client = client;