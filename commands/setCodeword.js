const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setcodeword',
    description: 'sets the verify codeword',
    isStaff: true,
    execute(message, args){

        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if (message.member.permissions.has('ADMINISTRATOR')){
            if(!args[0]){
                embed.setTitle('Error');
                embed.setDescription('You didnt specify a codeword!')
            }else{
                const oldCodeword = db.get('codeword')
                db.set('codeword', args[0])
                const newCodeword = db.get('codeword')

                embed.setTitle('Set the codeword!')
                embed.setDescription(`> **Old codeword:** ${oldCodeword}\n> **New codeword:** ${newCodeword}`)
                
            }
        }
        message.channel.send({embeds: [embed]})
    }
}