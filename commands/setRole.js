const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setrole',
    description: 'changes a role in the database',
    isStaff: true,
    execute(message, args){
        const embed = new Discord.MessageEmbed();
        embed.setColor(db.get('embedColor'))
        embed.setTimestamp()

        if (message.member.permissions.has('ADMINISTRATOR')){
            if(!message.mentions.roles.first()){
                embed.setTitle('Error')
                embed.setDescription('You have to mention a role!')
            }else{
                if(args[0] == 'staff'){
                    const oldStaffRole = db.get('staffRole')

                    db.set('staffRole', message.mentions.roles.first())
                    const newStaffRole = db.get('staffRole')

                    embed.setTitle('Set the staff role!')
                    embed.setDescription(`> **Old role:** ${oldStaffRole.name}\n> **New role:** ${newStaffRole.name}`)
                }
                else if(ags[0] == 'member'){
                    const oldMemberRole = db.get('memberRole')

                    db.set('memberRole', message.mentions.roles.first())
                    const newMemberRole = db.get('memberRole')

                    embed.setTitle('Set the member role!')
                    embed.setDescription(`> **Old role:** ${oldMemberRole.name}\n> **New role:** ${newMemberRole.name}`)
                }
            }
        }
        message.channel.send({embeds: [embed]})
    }
}