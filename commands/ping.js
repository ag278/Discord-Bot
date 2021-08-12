module.exports.run = async (bot, message, args) => {  //this is what will run when when command is called


    //we can delete thw if statement since command handler does that for us

    message.channel.send({
        embed: {
            title: "Ping!",
            description: "Pong",
            color: 0x1EBF3B,
        }
    })

    message.channel.send({
        embed: {
            title: "Ping!",
            description: "Pong",
            url: "https://www.google.com/",
            color: 0x1EBF3B,
            fields: [
                {
                    name: "This is a name",
                    value: "This is the **description** and we can use *formatting*, [and even linking!](https://www.google.com/)",
                    inline: true //we can also make it inline, so that it will print next to another field instrad of below it
                },
                {
                    name: "This is a name",
                    value: "This is the **description** and we can use *formatting*, [and even linking!](https://www.google.com/)",
                    inline: false
                },

            ],
            timeStamp: new Date(),
            footer: {
                text: "We can also include footer text",
                icon_url: 'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cXVlc3Rpb24lMjBhbmQlMjBhbnN3ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60.png'
            }

        }
    })


}

module.exports.config = {  //this is the config of command,we can ad things such as prpper usage
    command: "PING"

}