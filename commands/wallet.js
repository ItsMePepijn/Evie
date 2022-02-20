const Discord = require('discord.js');
const numeral = require('numeral')
const db = require('quick.db');
const {checkBalance} = require('../balance')

module.exports = {
    name: 'wallet',
    description: 'shows you your wallet',
    execute(message){
        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if(message.mentions.members.first()){
            var balance = checkBalance(message.mentions.members.first().id)

            if(Number.isInteger(balance)) var balance = numeral(balance).format('0,0')
            else var balance = numeral(balance).format('0,0.00')

            embed.setTitle(`${message.mentions.members.first().user.username}\'s balance:`)
            embed.setDescription(`${balance} mushrooms`)
        }
        else{
            var balance = checkBalance(message.member.id)

            if(Number.isInteger(balance)) var balance = numeral(balance).format('0,0')
            else var balance = numeral(balance).format('0,0.00')

            embed.setTitle(`${message.member.nickname}\'s balance:`)
            embed.setDescription(`${balance} mushrooms`)
        }


        message.channel.send({embeds: [embed]})
    }
}