const { EmbedBuilder } = require('discord.js');

module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      // Sử dụng try-catch để xử lý lỗi khi gửi tin nhắn
      try {
        // Tạo một EmbedBuilder mới
        const embed = new EmbedBuilder()
          .setTitle('<a:ICE_Giveaway:1129292607093223495> Hí cậu!')
          .setColor('#2F3136')
          .setDescription(`<a:ICE_chattim:930002077386682378> Xin chào ${member.user}\n<a:ICE_heart:930000437577388082> Chúc mừng bạn đã trúng **[[Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n<a:ICE_heart:930000437577388082> Bạn đã được phần quà **${giveaway.prize}!**\n<a:ICE_heart:930000437577388082> Hãy dms cho người tạo ga nhé!!`)
          .setTimestamp()
          .setFooter({
            text: `${member.user.username}`, 
            iconURL: member.user.displayAvatarURL()
          });

        // Gửi tin nhắn DM cho người trúng giải
        member.send({ embeds: [embed] }).catch(e => {
          console.error(`Không thể gửi tin nhắn cho ${member.user.tag}: ${e}`);
        });
      } catch (error) {
        console.error(`Đã xảy ra lỗi khi gửi tin nhắn cho ${member.user.tag}: ${error}`);
      }
    });
  }
};
