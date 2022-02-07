const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'disableverify',
    description: 'disables the verify system',
    isStaff: true,
    execute(message){

        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if (message.member.permissions.has('ADMINISTRATOR')){
            db.set('verifySystem', false)
            embed.setTitle('Disabled the automatic verify system')
            embed.setDescription(`To enable again use \`\`${db.get('prefix')}enableverify\`\``)
        }
        message.channel.send({embeds: [embed]})
    }
}