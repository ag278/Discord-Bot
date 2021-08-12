
module.exports.run = async (bot, message, args) => {  //this is what will run when when command is called
    if (!message.member.voice.channel)
        return message.channel.send("You must be connected to the voice channel to execute this command!");
    const music = args.join(" ");
    bot.distube.play(message, music);

}

module.exports.config = {  //this is the config of command,we can ad things such as prpper usage
    command: "play"

}