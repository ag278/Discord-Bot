
module.exports.run = async (bot, message, args) => {  //this is what will run when when command is called
    var fs = require('fs');
    var commandsList = fs.readFileSync('Storage/commands.txt', 'utf-8');
    //we can delete thw if statement since command handler does that for us
    message.channel.send(commandsList);
}

module.exports.config = {  //this is the config of command,we can ad things such as prpper usage
    command: "HELP"

}