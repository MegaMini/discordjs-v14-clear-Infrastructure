const { ActivityType } = require('discord.js');
const chalk = require('chalk');

module.exports = {
	name: "ready",
	once: true,
	async execute(member, client) {
		const server = process.env.GUILD_ID;
		const activities = [
			{ name: `Toplam ${client.users.cache.size} Üye`, type: ActivityType.Watching },
			{ name: `Made by MegaMini#9735`, type: ActivityType.Playing }
		];
		let i = 0;
		setInterval(() => {
			if (i >= activities.length) i = 0
			client.user.setActivity(activities[i])
			client.user.setStatus("dnd")
			i++;
		}, 5000);
		console.log(chalk.green(`[EVENT] Logged in as ${client.user.tag}!`))

	}
}