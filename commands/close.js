const meta = require("../metadata.json");

module.exports = {
    name: "close",
    aliases: ["end", 'finish'],
    description: "Closes the ticket that the command is sent in.",
    type: "support",
    permissions: "staff",
    execute(message, args) {
        if (message.channel.name.startsWith("ticket")) {
            message.channel.delete();
        } else {
            message.channel.send("This channel is not a ticket, and thus cannot be deleted.");
        }
    }
}