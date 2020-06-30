const Discord = require("discord.js");
const { prefix, server, logoURL, inviteURL } = require("../config.json");

// this is pretty much straight from the guide

module.exports = {
    name: "help",
    description: "Lists all the availible commands.",
    aliases: ["list", "commands"],
    type: "support",
    usage: "<command>",
    cooldown: 10,
    execute(message, args) {
        const data = []
        const { commands } = message.client;

        function isList(args) {
            if (!args.length) {
                return true;
            } else if (Number.isInteger(parseInt(args[0]))) {
                return true;
            } else {
                return false;
            }
        }
        function filterList(commands, filter) {
            var list = commands.filter(command => {
                return command.type === filter;
            });
            return list;
            // this command filters through the array of commands, and returns an objects
            // full of every command whose type is equivalent to the specified filter.
        }
        function constructEmbedList(list, lists) {
            let items = list.items.map(item => item.name).join('\n');
            items.slice(items.length - 2, items.length);

            const embed = new Discord.MessageEmbed()
            .setColor("#0000FF")
            .setTitle(`Command List (${list.order}/${lists.length})`)
            .setAuthor("PlatinumCraft Support Bot")
            .setDescription(`The following is a list of ${list.type} commands.\n` +
                            `To receive more information about a specic command, please type ${prefix}list <command>.`)
            .addField("Commands:", items)
            .setFooter("PlatinumCraft Bot")
            .setTimestamp();
            return embed;
        }
        
        
        if (isList(args)) {
            // Command list code
            let lists = [];
            let supportList = {
                items: filterList(commands, "support"),
                type: "support",
                order: 1
            } 
            let miscList = {
                items: filterList(commands, "misc"),
                type: "miscellaneous",
                order: 2
            }
            let staffList = {
                items: filterList(commands, "staff"),
                type: "staff only",
                order: 3
            } 
            lists.push(supportList);
            lists.push(miscList);
            lists.push(staffList);

            message.delete();
            switch (parseInt(args[0])) {
                case 1:
                    message.channel.send(constructEmbedList(supportList, lists));
                    break;
                case 2:
                    message.channel.send(constructEmbedList(miscList, lists));
                    break;
                case 3:
                    message.channel.send(constructEmbedList(staffList, lists));
                    break;
                default:
                    message.channel.send(constructEmbedList(supportList, lists));
                    break;
            }
        } else {
            // Command specification code
        }
        
        
        
        // if (!args.length) {
        //     data.push('Here\'s a list of all my commands:');
        //     console.log(commands);
        //     data.push(commands.map(command => command.name).join('\n'));
        //     console.log(data);
        //     data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command!`);
            
        //     return message.author.send(data, { split: true })
        //         .then(() => {
        //             if (message.channel.type === 'dm') return;
        //             message.reply('I\'ve sent you a DM with all my commands!');
        //         })
        //         .catch(error => {
        //             console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        //             message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
	    //         });
        // }

        // const name = args[0].toLowerCase();
        // const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        // if (!command) {
        //     return message.reply('that\'s not a valid command!');
        // }

        // data.push(`**Name:** ${command.name}`);

        // if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        // if (command.description) data.push(`**Description:** ${command.description}`);
        // if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        // data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        // message.channel.send(data, { split: true });
    }
}