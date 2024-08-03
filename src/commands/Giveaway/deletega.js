const Discord = require('discord.js')
module.exports = {
  name: "delete",
  aliases: ["deletega"],
  category: "🎉 Giveaway",
  description: "Kết Thúc Giveaway!",
  usage: "<PREFIX>deletegiveaway [ID GA]",
  run: async (client, message, args) => {
    if (!message.member.permissions.has('SEND_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return  message.replyr(client.emoji.x + "** Bạn cần quyền **\`MANAGE_MESSAGES\`**để xóa Giveaway!." + `\nSử dụng: **\`${client.config.PREFIX}delete [ID GA]\``);
    }

    // If no message ID or giveaway name is specified
    if (!args[0]) {
      return  message.reply(client.emoji.x + "** Bạn phải chỉ định một ID GA hợp lệ!" + `\nSử dụng: **\`${client.config.PREFIX}delete [ID GA]\``);
    }

    // try to found the giveaway with prize then with ID
    let giveaway =
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
      // Search with giveaway ID
      client.giveawaysManager.giveaways.find((g) => g.messageId === args[0]);

    // If no giveaway was found
    if (!giveaway) {
 message.reply(client.emoji.x + `** Không Tìm Thấy GA Với ID Này \`${args.join(' ')}\`**`);
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageId, {
      setEndTimestamp: Date.now()
    }).catch((e) => {
      console.log
      if (e.startsWith(`Giveaway with message Id ${giveaway.messageId} is already ended.`)) {
        return  message.reply(client.emoji.x + '** Ga Này Đã Kết Thúc**');
      } else {
        console.error(e);
        return  message.reply(client.emoji.x + '** Lỗi Hệ Thống Vui Lòng Contact Support, Staff...**');
      }
    });
    client.giveawaysManager.delete(giveaway.messageId).then(() => {
      let doneembed = new Discord.MessageEmbed()
        .setColor(client.config.botcolor)
        .setDescription(`${client.emoji.tick} Giveaway đã được xoá!`)
        .setTimestamp()
      return message.reply({ embeds: [doneembed] }).then(msg => {
        if (msg) setTimeout(() => msg.delete(), 5000)
      })
    })
      .catch((err) => {
        return  message.reply(' `' + client.emoji.x + '` không có Giveaway với ID: ' + giveaway.messageId + '! hãy kiểm tra lại!');
      });
  }
}
