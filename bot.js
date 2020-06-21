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


client.on("message", message => { // command handler
    function isValidCommand(message) { // checks if message is valid command command
        return (message.content.startsWith(prefix) && !message.author.bot);
        // if the message starts with a prefix, and was not sent by a bot, returns true; otherwise returns false.
    }
    if (!isValidCommand(message)) {return;};
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

    function checkRole(message, perm) { // checks if a user has the required permissions to execute a command
        var truth = (command.permissions === perm.name && // checks if the command requires the inputted role
            !message.member.roles.cache.some(role => role.name === perm.identifier));  // and if the user has the role
            // if the command doesn't require the role, or the user has the role, nothing happens.
            if (truth) {
                var reply = `You don't have the proper permissions to use this, ${message.author}. ` +
                            `In order to use this command, you must have the ${perm.identifier} role.`;         
                message.channel.send(reply); // sends a reply indicating that the user requires a higher role.
            }
            return truth;
    }

    if (checkRole(message, meta.role.staff)) {return;};
    if (checkRole(message, meta.role.srstaff)) {return;};

    // if (command.permissions === "botAuth" &&
    //     !message.author.id === config.ownerID) {
    //         var reply = `You don't have the proper permissions to use this, ${message.author}.\n` +
    //         `In order to use this command, you have to be the creator of the bot.`
    //         return message.channel.send(reply);
    //     }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    } // Checks if cooldowns has the command in it, if not, adds it.

    const now = Date.now(); // var with current time
    const timestamps = cooldowns.get(command.name); // var that gets the Collection for triggered command
    const cooldownAmount = (command.cooldown || 3) * 1000; // 3s is default, convers to milliseconds

    if (timestamps.has(message.author.id)) { // cooldowns
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