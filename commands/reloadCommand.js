const fs = require('fs')
const Discord = require('discord.js')
const db = require('quick.db')
const {client} = require('../modules/client')
const chalk = require('chalk')

module.exports = {
    name: 'reload',
    description: 'reloads all commands',
    isStaff: true,
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        .setColor(db.get('embedColor'))
        .setTimestamp()


        if(message.member.permissions.has('ADMINISTRATOR')){
            if(args[0] == 'all'){
                const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    delete require.cache[`${__dirname}/${file}`]
                    const command = require(`${__dirname}/${file}`);

                    if(command.isDisabled) console.log(chalk.redBright('[COMMAND HANDLER]') + ` - ${file} has been reloaded but its disabled!`);
                    else console.log(chalk.green('[COMMAND HANDLER]') + ` - ${file} has been reloaded`);

                    client.commands.set(command.name, command);

                    embed.setTitle('Reloaded commands!')
                    embed.setDescription('All commands have been reloaded!')
                    message.channel.send({embeds: [embed]})
                }
            }
            else{
                const input = args[0]
                const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
                for (const file of commandFiles){
                    const command = require(`${__dirname}/${file}`);

                    if(command.name == input){
                        delete require.cache[`${__dirname}/${file}`]
                        const command = require(`${__dirname}/${file}`);
    
                        if(command.isDisabled) console.log(chalk.redBright('[COMMAND HANDLER]') + ` - ${file} has been reloaded but its disabled!`);
                        else console.log(chalk.green('[COMMAND HANDLER]') + ` - ${file} has been reloaded`);
    
                        client.commands.set(command.name, command);

                        embed.setTitle('Reloaded command!')
                        embed.setDescription(`\`\`${command.name}\`\` has been reloaded!`)
                        message.channel.send({embeds: [embed]})
                    }
                }
            }
        }
    }
}