//calling the package
const { timeStamp } = require('console');
var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');
DisTube = require('distube'),
    client = new Discord.Client(),
    config = {
        prefix: ".",
        token: process.env.TOKEN || "Your Discord Token"
    };

// Create a new DisTube
bot.distube = new DisTube(bot, { searchSongs: false, emitNewSongOnly: true });
bot.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf-8'));
bot.commands = new Discord.Collection() //we need to make a collection of all commands for the bot

fs.readdir('./commands', (err, files) => {  //reads the directory of commands folder
    if (err) console.log(err);
    var jsfiles = files.filter(f => f.split('.').pop() === 'js') //this check if the file extension is 'js' or the text after . is 'js'
    if (jsfiles.lengtt <= 0)
        return console.log('No commands found');  //no commands found in the folder
    else
        console.log(jsfiles.length + 'commands found');

    jsfiles.forEach((f, i) => {
        var cmds = require(`./commands/${f}`);  // gets to every js file in chosen folder
        console.log(`${f} loading...`)//
        bot.commands.set(cmds.config.command, cmds)//this gets the name of command as well as module in the file
    })

})



//listener event: message recieved(this will run everytime id a messge is recievd)
bot.on('message', message => {

    //variables
    var sender = message.author;  //the person who sent the message
    var msg = message.content.toUpperCase();
    var prefix = '>' //to text before commands
    var cont = message.content.slice(prefix.length).split(" "); //this slices off the prefix, then puts it on array
    var args = cont.slice(1); //this is everything after the command in the array

    if (!message.content.startsWith(prefix))
        return;

    var cmd = bot.commands.get(cont[0])//this tries to grab the command that we called in chat
    if (cmd) cmd.run(bot, message, args); //this check if it exist and if then it runs the command  
    else
        console.log("nhi");

    //deleting specific messages(message that are not an ID for me)
    if (message.channel.id === '868835996144390144')//check if the meaasge isin the specific channel
    {
        if (isNaN(message.content)) {   //check if the message is not a number , if its not then following code will run
            message.delete();
            message.author.send('please only post the number and not any other text, thank you');//this private message the author will revive

        }
    }

    //to delete the message first we need to make sure that the bot is not reading its own message
    if (sender.id === '868844410786426900') {   //check if the is of sender is same as that of bot
        return;  //cancelthe rest of listener event
    }
    if (msg.includes('FUCK')) {//check if the word lettuce is included in the message 
        message.delete();
        //.then(msg => console.log(`Deleted message from ${msg.author.username}`))
        //.catch(console.error);

        //deletes the message
        message.author.send(`the word F*** is banned , please don't use it`);

    }

    // if (msg.startsWith(prefix + 'USERINFO')) {
    //     ////assuming the user wants himself info
    //     if (msg === prefix + 'USERINFO')
    //         message.channel.send(userInfo(sender));
    // }


    //let's make sure their username is there before writing the file
    if (!userData[sender.id]) userData[sender.id] = {
        messagesSent: 0
    }

    //now let's increase message sent and write thr final file
    userData[sender.id].messagesSent++;

    //to save the file 
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.log(err);
    })







});



//listener event:bot launched
bot.on('ready', () => {
    console.log('Bot launched...')  //runs when bot is launched

    //status
    bot.user.setStatus('online');  //your status goes here. it can be 'online','idle','invisible' and 'dnd '

    // gaming 
    //bot.user.setActivity('Beta Developement');

    //for streaming
    bot.user.setActivity('YouTube', { type: 'WATCHING' });

});

//listener event: user joins the server
bot.on('guildMemberAdd', member => {

    //now let's add a role when they join .First we need to get the role we want
    var role = member.guild.roles.cache.find(r => r.name === 'user') //this looks for a role in the server(guild), it searches by name ,meaning you can change 'user' to the role you want

    //second we will add the role
    member.role.add(role);

    //sending a message to channel when a user joins discord
    member.guild.channels.cache.get('869313241019478017').send('**' + member.user.username + '**, has joined the server'); //id of members log page
    //the first part gets the channel and second part sends the message
});

bot.on('guildMemberRemove', member => {

    //sending a message to channel when a user  leaves  discord
    member.guild.channels.cache.get('869313241019478017').send('**' + member.user.username + '**, has left the server'); //id of members log page
    //the first part gets the channel and second part sends the message
});




//login
//bot.login('secret token');
bot.login('ODY4ODQ0NDEwNzg2NDI2OTAw.YP1kaQ.QESFLgLW9tJWq5YLXg5ZECWCcZ4');//
