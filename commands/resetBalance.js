const Discord = require('discord.js');
const numeral = require('numeral')
const db = require('quick.db');
var economy = new db.table('economy');

module.exports = {
    name: 'resetbalance',
    description: 'resets the balance of the mentioned user',
    execute(message){

        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if (message.member.permissions.has('ADMINISTRATOR')){
            if(message.mentions.members.first()){
                var target = message.mentions.members.first()

                var oldBalance = economy.get(`user_${target.id}.balance`)
                if(oldBalance === null) {
                    var oldBalance = 1000
                }

                economy.set(`user_${target.id}.balance`, 1000)

                if(Number.isInteger(oldBalance)) var oldBalance = numeral(oldBalance).format('0,0')
                else var oldBalance = numeral(oldBalance).format('0,0.00')

                embed.setTitle(`${target.user.username}'s balance has been reset!`)
                embed.setDescription(`**Old balance:** ${oldBalance}`)

                message.channel.send({embeds: [embed]})
            }
        }
    }
}