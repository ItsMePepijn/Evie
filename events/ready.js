module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        console.log(`${client.user.displayName} Has logged in!`);
        client.user.setPresence({ activities: [{ name: 'all the lil mushrooms', type: 'WATCHING' }], status: 'dnd' });
    },
};