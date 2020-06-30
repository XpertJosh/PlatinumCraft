const meta = require("../metadata.json");

module.exports = {
    name: "purge",
    description: "Removes an amount of messages from a channel.",
    aliases: ["remove"],
    type: "staff",
    usage: "<amount>",
    cooldown: 10,
    permissions: "srstaff",
    execute(message, args) {
        message.channel.bulkDelete(args[0]);
    }
}