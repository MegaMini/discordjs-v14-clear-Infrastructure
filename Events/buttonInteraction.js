const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        const button = client.buttons.get(interaction.customId.split(`-`)[0]);
        if (!button) return;

        try {
            if (button.permissions) {
                if (!interaction.memberPermissions.has(PermissionsBitField.resolve(button.permissions || []))) {
                    const perms = new EmbedBuilder()
                        .setDescription(`🚫 ${interaction.user}, You don't have \`${button.permissions}\` permissions to interact this button!`)
                        .setColor('Red')
                    return interaction.reply({ embeds: [perms], ephemeral: true })
                }
            }
            await button.run(client, interaction);
        } catch (error) {
            console.log(error);
        }
    }
}