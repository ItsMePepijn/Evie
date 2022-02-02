const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'setchannel',
    description: 'sets the bots embed color',
    isStaff: true,
    execute(message, args){
        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if(message.member.permissions.has('ADMINISTRATOR')){
            if(!message.mentions.channels.first()){
                embed.setTitle('Error')
                embed.setDescription('You have to mention a text channel!')
            }else{
                const channel = message.mentions.channels.first()
                if(channel.type != 'GUILD_TEXT'){
                    embed.setTitle('Error')
                    embed.setDescription('Thats not a text channel!')
                }else{
                    if(args[0] == 'verify'){
                        delete channel.guild;

                        const oldVerifyCannel = db.get('verifyChannel')

                        db.set('verifyChannel', channel)
                        const newVerifyChannel = db.get('verifyChannel')

                        embed.setTitle('Set the verify channel!')
                        embed.setDescription(`> **Old channel:** <#${oldVerifyCannel.id}>\n> **New channel:** <#${newVerifyChannel.id}>`)
                    }
                    else if(args[0] == 'main'){
                        delete channel.guild;

                        const oldMainCannel = db.get('mainChannel')

                        db.set('mainChannel', channel)
                        const newMainChannel = db.get('mainChannel')

                        embed.setTitle('Set the main channel!')
                        embed.setDescription(`> **Old channel:** <#${oldMainCannel.id}>\n> **New channel:** <#${newMainChannel.id}>`)
                    }
                }
            }
        }
        message.channel.send({embeds: [embed]})
    }
}