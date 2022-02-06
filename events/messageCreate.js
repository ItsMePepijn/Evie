const db = require('quick.db');
const pfx = db.get('prefix');
const {client} = require('../client')

module.exports = {
    name: 'messageCreate',
    execute(message){
        if(message.channel.id == db.get('verifyChannel').id){

            if(message.author.bot || message.member.roles.cache.has(db.get('staffRole').id)) return;
            const cnt = message.content.trim().split(' ');
            const memberRole = message.guild.roles.cache.get(db.get('memberRole').id);

            function checkAge(cnt){
                for(item of cnt){
                    if(!isNaN(item)){
                        if(item > 12 && item < 20) return true
                    }  
                }
            }

            if(checkAge(cnt) && message.content.toLowerCase().match(db.get('codeword'))){
                message.member.roles.add(memberRole);
                return message.delete()
            }else{
                return message.delete()
            }
        }


        const args = message.content.slice(pfx.length).trim().split(' ');

        if(message.content.toLowerCase().match('grrr') && !message.author.bot) message.reply('Hey tiger! grrr~')

        if (!message.content.startsWith(pfx) || message.author.bot || !message.guild) return;
        const command = args.shift().toLowerCase();
    
        const file = client.commands.get(command);
        if(file) file.execute(message, args, client);
    }
}