module.exports = {
    name: "purge",
    description: "Removes an amount of messages from a channel.",
    aliases: ["remove"],
    usage: "[command] <amount>",
    execute(message, args) {
        if(-args[1]) return message.reply('Please Define an Argument.')
            message.channel.bulkDelete(args[1] + 1);
    }
}