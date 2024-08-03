const Discord = require('discord.js');

module.exports = { 
  name: "listga",
  aliases: ["lga", "ltga"],
  category: "🎉 Giveaway",
  description: "Tạo GiveAway!",
  usage: "<PREFIX>listga",
  run: async (client, message, args) => {
    const select = new Discord.StringSelectMenuBuilder()
      .setCustomId("select")
      .setPlaceholder("Choose a type of giveaway to view!")
      .addOptions([
        {
          label: '🎉 List Giveaway',
          description: 'Kiểm tra danh sách giveaway đang có ở ICE!',
          value: 'normal',
        },
      ]);

    const row = new Discord.ActionRowBuilder().addComponents([select]);

    let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === message.guild.id && !g.ended);

    if (!giveaways.some(e => e.messageId)) {
      return message.reply('💥 Không có giveaway nào đang hoạt động');
    }

    const msg = await message.reply({
      embeds: [new Discord.EmbedBuilder().setDescription("Chọn một tùy chọn trong menu chọn để bắt đầu!").setColor("#2F3136").setTimestamp()],
      components: [row]
    });

    let embed = new Discord.EmbedBuilder()
      .setTitle("<a:ICE_chattim:930002077386682378> Giveaway hiện đang hoạt động trong server: ")
      .setColor("#2F3136")
      .setFooter({
        text: `${client.user.username}`, 
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp();

    const filter = i => i.customId === "select" && i.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 60000, max: 1 });

    collector.on("collect", async (i) => {
      i.update({ components: [] });
      const val = i.values[0];

      if (val === "normal") {
        await Promise.all(giveaways.map(async (x) => {
          embed.addFields({
            name: `<a:ICE_greenlike:914036706083209268> Giveaway:`,
            value: `<a:ICE_muiten:1021012134274011166> **Nội Dung:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})\n<a:ICE_muiten:1021012134274011166> Bắt đầu đươc:** <t:${Math.floor(x.startAt / 1000)}:R> (<t:${Math.floor(x.startAt / 1000)}:f>)\n**<a:ICE_muiten:1021012134274011166> Kết thúc lúc:** <t:${Math.floor(x.endAt / 1000)}:R> (<t:${Math.floor(x.endAt / 1000)}:f>)`
          });
        }));
        msg.edit({ embeds: [embed] });
      }
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        msg.edit({ content: "👀 Hãy thử lại nhé!", components: [] });
      }
    });
  }
};
