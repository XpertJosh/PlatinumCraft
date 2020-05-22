const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client;

const { prefix, token } = require("./config.json");
const config = require("./config.json");
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("This bot is online...")

});

client.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.get(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }

})


client.login(token);

// if (command === "setup") {
//     if (args[0] === "list") {
//         //list commands
//     }
//     if (args[0] === "category") {
//         if (args[1]) {
//             const tickets = client.channels.fetch(args[1]);
//         } else {
//             message.channel.send("-setup category <id>");
//         }
//     }
// }

// if (command === "ticket" || command === "new") {
//     message.delete;
//     createTicket(message);
// }