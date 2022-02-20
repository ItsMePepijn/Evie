const Discord = require('discord.js');
const numeral = require('numeral');
const db = require('quick.db');
const pfx = db.get('prefix');
var economy = new db.table('economy')

module.exports = {
    name: 'pay',
    description: 'pay someone money!',
    execute(message, args){

        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if(message.mentions.members.first() && message.mentions.members.first().id != message.member.id){
            const payee = message.mentions.members.first()
            if(!isNaN(args[1])){
                var amount = parseFloat(args[1])

                var payerBalance = economy.get(`user_${message.member.id}.balance`)
                if(payerBalance === null) {
                    economy.set(`user_${message.member.id}.balance`, 1000)
                    var payerBalance = 1000;
                }

                if(payerBalance >= amount){
                    var payeeBalance = economy.get(`user_${payee.id}.balance`)
                    if(payeeBalance === null) {
                        economy.set(`user_${payee.id}.balance`, 1000)
                    }

                    economy.add(`user_${payee.id}.balance`, amount)
                    economy.subtract(`user_${message.member.id}.balance`, amount)

                    var payerBalance = economy.get(`user_${message.member.id}.balance`)
                    var payeeBalance = economy.get(`user_${payee.id}.balance`)

                    if(Number.isInteger(payerBalance)) var payerBalance = numeral(payerBalance).format('0,0')
                    else var payerBalance = numeral(payerBalance).format('0,0.00')

                    if(Number.isInteger(amount)) var amount = numeral(amount).format('0,0')
                    else var amount = numeral(amount).format('0,0.00')

                    embed.setTitle('Sent!')
                    embed.setDescription(`You payed ${payee.user.username} ${amount} mushrooms!\nYour new balance is: ${payerBalance}`)
                }
                else{
                    if(Number.isInteger(payerBalance)) var payerBalance = numeral(payerBalance).format('0,0')
                    else var payerBalance = numeral(payerBalance).format('0,0.00')

                    embed.setTitle(`Error!`)
                    embed.setDescription(`You dont have sufficient funds!\nYour balance: ${payerBalance}`)
                }
            }
            else{
                embed.setTitle(`Error!`)
                embed.setDescription(`You have to specify an amount!\nUsage: \`${pfx}${this.name} @member amount\`\nExample: ${pfx}${this.name} <@937661010402242641> 10000`)
            }
        }
        else{
            embed.setTitle(`Error!`)
            embed.setDescription(`You have to mention someone to pay!\nUsage: \`${pfx}${this.name} @member amount\`\nExample: ${pfx}${this.name} <@937661010402242641> 10000`)
        }

        message.channel.send({embeds: [embed]})
    }
}