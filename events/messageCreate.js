const db = require('quick.db');
const pfx = db.get('prefix');
const {client} = require('../client')

module.exports = {
    name: 'messageCreate',
    execute(message){
        const args = message.content.slice(pfx.length).trim().split(' ');

        if (!message.content.startsWith(pfx) || message.author.bot || !message.guild) return;
        const command = args.shift().toLowerCase();
    
        const file = client.commands.get(command);
        if(file) file.execute(message, args, client);
    }
}