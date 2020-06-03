// const config = require("../config.json");

// module.exports = {
//     name: "annoy",
//     aliases: ["spam"],
//     description: "Mentions a user repeatedly. To be used for \"ethical\" purposes only.",
//     permissions: "botAuth",
//     public: false,
//     usage: "[command] <targetID> <interval> <max> <channelID> <content>",
//     execute(message, args) {
//         if (message.author.id !== config.ownerID) {return};
//         var id = args[0];
//         var inter = args[1];
//         var max = 3;
//         if (args[2]) {
//             max = args[2];
//         }
//         var content = "Sup.";
//         if (args[3]) {
//             content = args[3];
//         }
//         var i = 0;
//         var interval = setInterval (function() {
//         if (i < max) {
//             message.channel.send(`${content} <@${id}>`);
//             i++;
//         }
//         }, inter * 1000);
//     }
// }