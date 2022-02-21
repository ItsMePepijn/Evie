const db = require('quick.db');
const pfx = db.get('prefix');
const {client} = require('../client')
var economy = new db.table('economy')
const {verifiedCheck} = require('../verifySystem')

module.exports = {
    name: 'messageCreate',
    execute(message){
        if(db.get('verifySystem') == true){
            if(message.channel.id == db.get('verifyChannel').id){
                verifiedCheck(message)
            }
        }
        if(message.author.bot || !message.guild) return;

        if(Math.floor(Math.random() * 6) == 1){
            var balance = economy.get(`user_${message.member.id}.balance`)
            if(balance === null) {
                economy.set(`user_${message.member.id}.balance`, 1000)
            }
            economy.add(`user_${message.member.id}.balance`, Math.floor(Math.random() * 16))
        }
        
        const args = message.content.slice(pfx.length).trim().split(' ');

        if(message.content.toLowerCase().match('grrr') && !message.author.bot) message.reply('Hey tiger! grrr~')

        if (!message.content.startsWith(pfx)) return;
        const command = args.shift().toLowerCase();
    
        const file = client.commands.get(command);
        if(file && !file.isDisabled) file.execute(message, args)
    }
}