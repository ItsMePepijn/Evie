const Discord = require('discord.js');
const numeral = require('numeral')
const db = require('quick.db');
var economy = new db.table('economy')

module.exports = {
    name: 'wallet',
    description: 'shows you your wallet',
    execute(message){
        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if(message.mentions.members.first()){
            var balance = economy.get(`user_${message.mentions.members.first().id}.balance`)
            if(balance === null) {
                economy.set(`user_${message.mentions.members.first().id}.balance`, 1000)
                var balance = 1000;
            }

            if(Number.isInteger(balance)) var balance = numeral(balance).format('0,0')
            else var balance = numeral(balance).format('0,0.00')

            embed.setTitle(`${message.mentions.members.first().user.username}\'s balance:`)
            embed.setDescription(`${balance} mushrooms`)
        }
        else{
            var balance = economy.get(`user_${message.member.id}.balance`)
            if(balance === null) {
                economy.set(`user_${message.member.id}.balance`, 1000)
                var balance = 1000;
            }

            if(Number.isInteger(balance)) var balance = numeral(balance).format('0,0')
            else var balance = numeral(balance).format('0,0.00')

            embed.setTitle(`${message.member.nickname}\'s balance:`)
            embed.setDescription(`${balance} mushrooms`)
        }


        message.channel.send({embeds: [embed]})
    }
}