const db = require('quick.db');
var economy = new db.table('economy')

exports.checkBalance = (id) => {
    var balance = economy.get(`user_${id}.balance`)
    if(balance === null) {
        economy.set(`user_${id}.balance`, 1000)
        var balance = 1000;
    }
    return balance
}

exports.updateBalance = (id) => {
    var balance = economy.get(`user_${id}.balance`)
    if(balance === null) {
        economy.set(`user_${id}.balance`, 1000)
    }
}