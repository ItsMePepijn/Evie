const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setcolor',
    description: 'sets the bots embed color',
    isStaff: true,
    execute(message, args){
        const staffRole = db.get('staffRole')

        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if (message.member.roles.cache.has(staffRole.id)){
            var re = /[0-9A-Fa-f]{6}/g;
            
            if (args[0].startsWith('#')){
                var input = args[0].slice(1);
            }else{
                var input = args[0]
            }

            if(!re.test(input)){
                embed.setTitle('Error');
                embed.setDescription('You didnt specify a valid HEX color code!\nExample: #00ffff')
            }else{
                const oldColor = db.get('embedColor')
                db.set('embedColor', `#${input}`)
                let newColor = db.get('embedColor')

                embed.setColor(newColor)
                embed.setTitle('Set my embed color!')
                embed.setDescription(`> **Old color:** ${oldColor}\n> **New color:** ${newColor}`)
                
            }
        }
        message.channel.send({embeds: [embed]})
    }
}