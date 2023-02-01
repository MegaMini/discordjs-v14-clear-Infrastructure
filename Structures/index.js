const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
  intents: 32767,
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

const fs = require('fs');
require('dotenv').config()

client.commands = new Collection()
client.buttons = new Collection();
client.config = require('./config.json');

module.exports = client;

fs.readdirSync('./Handlers').forEach((handler) => {
  require(`./Handlers/${handler}`)(client)
});

process.on("unhandledRejection", (reason, promise) => { console.log(reason, promise) })
process.on("uncaughtException", (err) => { if (err === "DiscordAPIError[10062]: Unknown interaction" || err === "DiscordAPIError[40060]: Interaction has already been acknowledged.") return; console.log(err) })
process.on("uncaughtExceptionMonitor", (err) => { if (err === "DiscordAPIError[10062]: Unknown interaction" || err === "DiscordAPIError[40060]: Interaction has already been acknowledged.") return; console.log(err) })

client.login(process.env.TOKEN)