const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'enableverify',
    description: 'enables the verify system',
    isStaff: true,
    execute(message){

        const embed = new Discord.MessageEmbed();
        embed.setTimestamp()
        embed.setColor(db.get('embedColor'))

        if (message.member.permissions.has('ADMINISTRATOR')){
            db.set('verifySystem', true)
            embed.setTitle('Enabled the automatic verify system')
            embed.setDescription(`To disable again use \`\`${db.get('prefix')}disableverify\`\``)
        }
        message.channel.send({embeds: [embed]})
    }
}