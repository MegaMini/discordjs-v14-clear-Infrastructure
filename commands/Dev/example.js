const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
     name: 'status',
     description: "Botun istatistiklerini gösterir.",
     devOnly: true,
     botPerms: [''],
     run: async (client, interaction) => {
          interaction.reply({embeds: [{description: `**Client**: \`🟢 ONLINE\` - \`${client.ws.ping}ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>`}], ephemeral: true})
     }
};