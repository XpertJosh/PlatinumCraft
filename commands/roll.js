module.exports = {
    name: "roll",
    description: "Returns a random number between the minimum and maximum value. Default value is 1-6.",
    aliases: ["rng", "dice"],
    usage: "<min> <max>",
    cooldown: 1,
    execute(message, args) {
        function generateRandomInteger(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        
        var min = 1;
        var max = 6;
        console.log(`${min}, ${max}`);
        // sets default values
        if (args[0]) {min = args[0]};
        if (args[1]) {max = args[1]};
        console.log(`${min}, ${max}`);
        // overrides them if values are specified.
        
        message.channel.send(`The result is ${generateRandomInteger(min, max)}.`);
        // generates and sends a random integer, using the generateRandomInteger function
    }
}