const meta = require("../metadata.json");

module.exports = {
    name: "new",
    description: "Creates a support ticket",
    aliases: ["ticket"],
    execute(message, args) {
        const guild = message.guild;
            guild.channels.create('ticket-' + message.author.username, { 
                type: 'text', 
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: meta.role.support.id,
                        allow: ['VIEW_CHANNEL'],
                    }
                ]
        });
        message.reply('A support ticket has been created for you.');
    }  
    //ticket
}