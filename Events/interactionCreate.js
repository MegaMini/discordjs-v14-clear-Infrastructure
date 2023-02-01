const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');

module.exports = {
	name: "interactionCreate",
	once: false,
	async execute(interaction, client) {
		const slashCommand = client.commands.get(interaction.commandName);
		const server = client.guilds.cache.get(process.env.GUILD_ID)

		if (!slashCommand) return client.commands.delete(interaction.commandName);

		try {
			if (slashCommand.userPerms || slashCommand.botPerms) {
				if (!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
					const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, Bu komudu kullanabilmek için \`${slashCommand.userPerms}\` yetkisine ihtiyacın var!`)
						.setColor('Red')
					return interaction.reply({ embeds: [userPerms], ephemeral: true })
				}
				if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
					const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, Bu komut için benim \`${slashCommand.botPerms}\` yetkisine ihtiyacım var!`)
						.setColor('Red')
					return interaction.reply({ embeds: [botPerms], ephemeral: true });
				}

				if (slashCommand.devOnly == true && interaction.member.id != client.config.owner.id) {
					const dev = new EmbedBuilder()
						.setDescription(`🚫 ${interaction.user}, Bu komudu kullanabilmek için geliştirici olmalısın!`)
						.setColor('Red')
					return interaction.reply({ embeds: [dev], ephemeral: true })
				}
				await slashCommand.run(client, interaction);
			}
		} catch (error) {
			console.log(error);
		}
	}
}