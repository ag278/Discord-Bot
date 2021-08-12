module.exports.run = async (bot, message, args) => {  //this is what will run when when command is called

    function userInfo(user) {
        var finalString = '';
        ////now calling the details
        finalString += '** ' + user.username + '**, with **ID** of **' + user.id + "**";
        finalString += '\n';
        var userCreated = user.createdAt.toString().split(' ');
        finalString += 'This ID was **created on ' + userCreated[1] + ', ' + userCreated[2] + ', ' + userCreated[3] + '.**';
        finalString += '\n';
        finalString += 'Since then you have **sent ' + userData[user.id].messagesSent + ' messages** int the server';
        return finalString;
    }

    ////assuming the user wants himself info
    //if (msg === prefix + 'USERINFO')
    var fs = require('fs');
    var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf-8'));
    var sender = message.author;
    message.channel.send(userInfo(sender));

}

module.exports.config = {  //this is the config of command,we can ad things such as prpper usage
    command: "USERINFO"

}