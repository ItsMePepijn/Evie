const Discord = require('discord.js');
const numeral = require('numeral')
const db = require('quick.db');
var economy = new db.table('economy');

module.exports = {
    name: 'addbalance',
    description: 'adds money to a user\'s balance',
    execute(message, args){

        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if (message.member.permissions.has('ADMINISTRATOR')){
            if(message.mentions.members.first() && (!isNaN(args[1]))){
                var target = message.mentions.members.first()
                var amount = parseFloat(args[1])

                var oldBalance = economy.get(`user_${target.id}.balance`)
                if(oldBalance === null) {
                    economy.set(`user_${target.id}.balance`, 1000)
                    var oldBalance = 1000;
                }

                economy.add(`user_${target.id}.balance`, amount)
                var newBalance = economy.get(`user_${target.id}.balance`)

                if(Number.isInteger(newBalance)) var newBalance = numeral(newBalance).format('0,0')
                else var newBalance = numeral(newBalance).format('0,0.00')

                if(Number.isInteger(oldBalance)) var oldBalance = numeral(oldBalance).format('0,0')
                else var oldBalance = numeral(oldBalance).format('0,0.00')

                embed.setTitle(`Set ${target.user.username}'s balance!`)
                embed.setDescription(`**Old balance:** ${oldBalance}\n**New balance:** ${newBalance}`)

                message.channel.send({embeds: [embed]})
            }
        }
    }
}