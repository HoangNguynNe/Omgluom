const { Client, Message, EmbedBuilder } = require('discord.js');
const ROLE_ID = '1147772112472391764';
const TARGET_CHANNEL_ID = '1018355234659119216'; // Thay vì TARGET_GUILD_ID, giờ bạn dùng TARGET_CHANNEL_ID
const role_Partners = '894412827933167678';

module.exports = {
  name: "deletepartner",
  category: "🔰 Partner",
  aliases: ["dpn", "dpartner"],
  usage: "<PREFIX>dpn",
  description: "Xóa partner",
  run: async (client, message, args) => {
    if (message.author.bot) return;

    // Lấy channel từ message
    const channel = message.guild.channels.cache.get(TARGET_CHANNEL_ID);
    if (!channel) return message.reply('Kênh không tồn tại.');

    // Lấy member từ message.guild
    const member = message.guild.members.cache.get(message.author.id);
    if (!member) return message.reply('Bạn không phải thành viên của guild này.');

    // Kiểm tra xem thành viên có vai trò cụ thể không
    if (member.roles.cache.has(ROLE_ID)) {
      const tagUser = message.mentions.users.first();

      if (!tagUser) {
        return message.reply('Cần người tag. Ví dụ: `ideletepartner @nguoitag`');
      }

      try {
        // Gửi tin nhắn và lấy đối tượng tin nhắn
        const datapartner = await client.partner.getMessageIDByUserPartner(tagUser.id);
      
          if (!datapartner) {
            return message.reply(`Không tìm thấy dữ liệu đối tác cho userPartner.`);
          }
      
          const { messageID, yourPartner, linkserver } = datapartner;
          const existingMessage = await channel.messages.fetch(messageID);

        // Gọi hàm addpartner với các tham số
        if(client.partner.deletepartner(messageID)){
          const guildMember = message.guild.members.cache.get(tagUser.id);
          await guildMember.roles.remove(role_Partners);
          await existingMessage.delete();
          message.reply(`Đã xóa partner thành công!`);
        }
      } catch (error) {
        console.error(error);
        message.reply('Đã xảy ra lỗi khi xóa tin nhắn.');
      }
    } else {
      return message.channel.send('Bạn không phải ICE Partner Manager của ICE để sử dụng lệnh này');
    }
  }
};
