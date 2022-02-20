const Discord = require('discord.js');
const numeral = require('numeral')
const db = require('quick.db');
var economy = new db.table('economy')

module.exports = {
    name: 'leaderboard',
    description: 'shows the economy leaderboard!',
    async execute(message){
        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))
        embed.setTitle(`${message.guild.name}'s leaderboard!`)

        let leaderboardData = economy.all().sort((a, b) => b.data.balance - a.data.balance)

        function balance(amount){
            if(Number.isInteger(amount)) return numeral(amount).format('0,0')
            else return numeral(amount).format('0,0.00')
        }

        embed.addField('🥇 #1', `<@${leaderboardData[0].ID.slice(5)}> **-** ${balance(leaderboardData[0].data.balance)}`)
        embed.addField('🥈 #2', `<@${leaderboardData[1].ID.slice(5)}> **-** ${balance(leaderboardData[1].data.balance)}`)
        embed.addField('🥉 #3', `<@${leaderboardData[2].ID.slice(5)}> **-** ${balance(leaderboardData[2].data.balance)}`)

        for(let i = 3; i<=9; i++){
            embed.addField(`#${i+1}`, `<@${leaderboardData[i].ID.slice(5)}> **-** ${balance(leaderboardData[i].data.balance)}`)
        }


        message.channel.send({embeds: [embed]})

    }
}