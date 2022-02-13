const Discord = require('discord.js'); 
const db = require('quick.db');
const os = require('os');

module.exports = {
    name:'hosting',
    description: 'Lists all the hosting info',
    execute(message){
        const embed = new Discord.MessageEmbed()
        .setColor(db.get('embedColor'))
        .setTitle('Hosting info:')
        .setDescription('I am hosted by your lovely admin, Ikke!\nFor any questions about me or my hosting, contact <@387920955105738753>')
        .addField('CPU architecture', os.arch())
        .addField('CPU', os.cpus()[0].model)
        .addField('Memory', `${Math.round(os.freemem/1000000)} / ${Math.round(os.totalmem/1000000)}`)
        .addField('Host name', os.hostname())
        .addField('Load average', `1m: ${os.loadavg()[0]}\n5m: ${os.loadavg()[1]}\n15m: ${os.loadavg()[2]}`)
        .addField('Platform', os.platform())
        .addField('Version', os.release())
        .addField('Uptime', `${os.uptime()}`)

        message.channel.send({embeds: [embed]})
    }
}