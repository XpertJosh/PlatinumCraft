module.exports = {
	name: 'ping',
	description: 'Ping!',
	type: "misc",
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};