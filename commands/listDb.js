const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'listdb',
    description: 'Lists every item in the database',
    isStaff: true,
    execute(message){
        const staffRole = message.guild.roles.cache.get(db.get('staffRole').id);

        if (message.member.roles.cache.has(staffRole.id)){
            const length = db.all().length

            const embed = new Discord.MessageEmbed()
            embed.setColor(db.get('embedColor'))

            if(length == 1){
                embed.addField('Current database:', `Database has ${length} item`)
            }
            else{
                embed.addField('Current database:', `Database has ${length} items`)
            }

            db.all().forEach(item => {
                let data = JSON.parse(item.data)
                if(data.permissions){
                    delete data.hoist;
                    delete data.mentionable;
                    delete data.managed;
                    delete data.tags;
                    delete data.icon;
                    delete data.unicodeEmoji;
                    delete data.guild;
                    const textData = JSON.stringify(data);

                    embed.addField(item.ID + ' (cut down)', `\`\`\`json\n${textData}\`\`\``)
                }
                else if(data.type == 'GUILD_TEXT'){
                    delete data.permissionOverwrites;
                    delete data.messages;
                    delete data.threads;
                    delete data.lastPinTimestamp;
                    delete data.guildId;
                    delete data.lastMessageId;
                    const textData = JSON.stringify(data);

                    embed.addField(item.ID + ' (cut down)', `\`\`\`json\n${textData}\`\`\``)
                }else{
                    embed.addField(item.ID, `\`${data}\``)
                }
            })

            message.channel.send({embeds: [embed]})
        }
    }
}
