const { EmbedBuilder } = require('discord.js');

module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      // Tạo một EmbedBuilder mới
      const embed = new EmbedBuilder()
        .setTitle('🎁 Hé lô bạn')
        .setColor('#2F3136')
        .setDescription(`Chào ${member.user}\n Vì bạn trước hong làm req nên người chiến thắng mới là cậu **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n Cậu đã thắng **${giveaway.prize}!**\nHãy dms cho người tạo ga nhé!!`)
        .setTimestamp()
        .setFooter({
          text: `${member.user.username}`, 
          iconURL: member.user.displayAvatarURL()
        });

      // Gửi tin nhắn DM cho người trúng giải
      member.send({ embeds: [embed] }).catch(e => {
        console.error(`Không thể gửi tin nhắn cho ${member.user.tag}: ${e}`);
      });
    });
  }
};
