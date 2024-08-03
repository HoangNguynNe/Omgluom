const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Ghi lại tin nhắn đã bị xoá",
  cooldown: 5,
  aliases: ["sn"],
  category: "🔰 Thông Tin",
  usage: "<PREFIX>snipe",
  clientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  run: async (client, message, args) => {
    function secondsToDhms(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);

      var dDisplay = d > 0 ? d + (d == 1 ? " ngày, " : " ngày, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " giờ, " : " giờ, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " phút, " : " phút, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " giây" : " giây") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    const snipes = client.snipes.get(message.channel.id) || [];
    if (snipes.length === 0)
      return message.reply(
        `${client.emoji.x} **Ở đây không có tin nhắn nào bị xoá cả**`
      );

    const sotn = parseInt(args[0], 10) - 1 || 0;
    const tnxoa = snipes[sotn];
    if (!tnxoa)
      return message.reply(
        `${client.emoji.x} Ở đây chỉ có \`${snipes.length}\` tin nhắn đã bị xoá`,
        message.channel
      );

    const { content, image, author, date } = tnxoa;
    var endDate = new Date();
    var time = (endDate.getTime() - date.getTime()) / 1000;
    const embed = new EmbedBuilder()
      .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL() })
      .setDescription(
        `${content.length != 0 ? content : "tin nhắn không có nội dung"}`
      )
      .setFooter({ text: `${secondsToDhms(time)} trước | đang có ${sotn + 1}/${snipes.length} bị xóa` })
      .setColor("#adeeee");

    if (image) {
      embed.setImage(image);
    }

    return message.channel.send({ embeds: [embed] });
  },
};
