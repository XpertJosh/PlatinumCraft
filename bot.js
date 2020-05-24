const fs = require('fs');
const Discord = require("discord.js");
const client = new Discord.Client;

const { prefix, token } = require("./config.json");
const config = require("./config.json");
const meta = require("./metadata.json");
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("This bot is online...");
});

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) // checks if the command is a command
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // or an alias
        // if so, stores it as command
	if (!command) return; // if command is empty, return.


    if (command.args && !args.length) {
        let reply = message.channel.send(`You didn't provide any arguments, ${message.author}.`);

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        } // If a command has a usage: "", it will specify the usage of the command when entered wrong.

        return message.channel.send(reply);
    } // Runs if no arguments are run in a command that requires arguments (args: true);

    if (command.permissions === meta.role.support.default &&
        !message.member.roles.cache.some(role => role.name === meta.role.support.default)) {
            var reply = `You don't have the proper permissions to use this, ${message.author}.\n` +
                    `In order to use this command, you must have the ${meta.role.support.default} role.`;         
            return message.channel.send(reply);
        }

    if (command.permissions === meta.role.moderation.default &&
        !message.member.roles.cache.some(role => role.name === meta.role.moderation.default)) {
            var reply = `You don't have the proper permissions to use this, ${message.author}.\n` +
                    `In order to use this command, you must have the ${meta.role.moderation.default} role.`;         
            return message.channel.send(reply);
        }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    } // Checks if cooldowns has the command in it, if not, adds it.

    const now = Date.now(); // var with current time
    const timestamps = cooldowns.get(command.name); // var that gets the Collection for triggered command
    const cooldownAmount = (command.cooldown || 3) * 1000; // 3s is default, convers to miliseconds

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
        command.execute(message, args); // Tries to run the command
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    } // If an error occours, log it and tell the user.


})


client.login(token);