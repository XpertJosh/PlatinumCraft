const meta = require("../metadata.json");

module.exports = {
    name: "new",
    description: "Creates a support ticket",
    aliases: ["ticket", "support"],
    execute(message, args) {
            message.guild.channels.create('ticket-' + message.author.username, { 
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
                        id: meta.role.staff.id,
                        allow: ['VIEW_CHANNEL'],
                    }
                ]
        }).then(channel => channel.setParent(meta.ticketCategory.id))
        .catch(console.error());
        
        message.reply('A support ticket has been created for you.');
    }  
    //ticket
}