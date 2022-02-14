const Discord = require('discord.js'); 
const db = require('quick.db');
const os = require('os');
const ms = require('ms')

module.exports = {
    name:'hosting',
    description: 'Lists all the hosting info',
    execute(message){
        const embed = new Discord.MessageEmbed()
        .setColor(db.get('embedColor'))
        .setTitle('Hosting info:')
        .setDescription('I am hosted by your lovely admin, Ikke!\nFor any questions about me or my hosting, contact <@387920955105738753>')
        .addField('CPU', os.cpus()[0].model, true)
        .addField('CPU architecture', os.arch(), true)
        .addField('Memory', `${Math.round(os.totalmem - os.freemem) / 1000000} / ${Math.round(os.totalmem/1000000)}`, true)
        .addField('Platform', `${os.platform()} ${os.release()}`, true)
        .addField('Load average', `1m: ${os.loadavg()[0]}\n5m: ${os.loadavg()[1]}\n15m: ${os.loadavg()[2]}`, true)
        .addField('Uptime', `${ms(os.uptime()*1000, {long: true})}`, true)

        message.channel.send({embeds: [embed]})
    }
}