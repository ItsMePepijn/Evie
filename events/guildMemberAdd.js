module.exports = {
    name: 'guildMemberAdd',
    execute(member){
        console.log(`${member.displayName} joined the server!`)
    }
}