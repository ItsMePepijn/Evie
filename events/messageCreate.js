const db = require('quick.db');
const pfx = db.get('prefix');
const Discord = require('discord.js')
const {client} = require('../client')
var economy = new db.table('economy')

module.exports = {
    name: 'messageCreate',
    execute(message){
        if(db.get('verifySystem') == true){
            if(message.channel.id == db.get('verifyChannel').id){

                if(message.author.bot || message.member.roles.cache.has(db.get('staffRole').id)) return;
                const cnt = message.content.trim().split(' ');
                const memberRole = message.guild.roles.cache.get(db.get('memberRole').id);
                const verifyLogs = message.guild.channels.cache.get(db.get('verifyLogs').id)
                const embed = new Discord.MessageEmbed()
                .setColor(db.get('embedColor'))
                .setTimestamp()

                function checkAge(cnt){
                    for(item of cnt){
                        if(!isNaN(item)){
                            if(item > 12 && item < 20) return {
                                check: true,
                                age: item
                            }
                        }  
                    }
                }

                const user = checkAge(cnt)

                if(user.check && message.content.toLowerCase().match(db.get('codeword'))){
                    message.member.roles.add(memberRole);
                    console.log(`${message.member.user.tag} has veen verified!`)

                    embed.setTitle('Verified new user!')
                    embed.setDescription(`**User:** <@${message.member.user.id}>\n**Age:** ${user.age}`)
                    verifyLogs.send({embeds: [embed]})
                    return message.delete()
                }else{
                    return message.delete()
                }
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

        if(message.mentions.members.first() && message.mentions.members.first().id == '937661010402242641') message.reply(`Hey ${message.member}**!**`)
        const args = message.content.slice(pfx.length).trim().split(' ');

        if(message.content.toLowerCase().match('grrr') && !message.author.bot) message.reply('Hey tiger! grrr~')

        if (!message.content.startsWith(pfx)) return;
        const command = args.shift().toLowerCase();
    
        const file = client.commands.get(command);
        if(file && !file.isDisabled) file.execute(message, args)
    }
}