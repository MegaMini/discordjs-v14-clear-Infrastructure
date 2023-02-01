module.exports = {
	id: 'red',
	permissions: [],
	run: async (client, interaction) => {
          const { guild, customId, channel, member } = interaction;

		return interaction.update({content: `İşlem başarıyla **İptal** Edildi.`, components: [], ephemeral: true})
	}
};
