const fs = require('fs');
const chalk = require('chalk')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0")

module.exports = (client) => {
	fs.readdirSync('../Events/').filter((file) => file.endsWith('.js')).forEach((event) => {
		const events = require(`../../Events/${event}`);

		if (events.once) {
			client.once(events.name, (...args) => events.execute(...args, client));
		} else {
			client.on(events.name, (...args) => events.execute(...args, client));
		};
		table.addRow(event.split('.js')[0], '+')
	})
	console.log(chalk.greenBright(table.toString()))
};
