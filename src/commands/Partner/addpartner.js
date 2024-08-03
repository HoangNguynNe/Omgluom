const { Client, Message, EmbedBuilder } = require('discord.js');
const ROLE_ID = '1147772112472391764';
const TARGET_CHANNEL_ID = '1018355234659119216'; // Thay vì TARGET_GUILD_ID, giờ bạn dùng TARGET_CHANNEL_ID
const role_Partners = '894412827933167678';

module.exports = {
  name: "addpartner",
  category: "🔰 Partner",
  aliases: ["apn", "apartner"],
  usage: "<PREFIX>apn",
  description: "Thêm partner",
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
      const linkserver = args.slice(1).join(' ');

      if (!tagUser || !linkserver) {
        return message.reply('Cần người tag và link server. Ví dụ: `iaddpartner @nguoitag linkserver`');
      }

      const userID = message.author.id;

      try {
        // Gửi tin nhắn và lấy đối tượng tin nhắn
        const sentMessage = await channel.send(`Key: <@${userID}> \nĐại diện: <@${tagUser.id}>\nLink server: ${linkserver} `);

        // Lấy messageID của tin nhắn đã gửi
        const messageID = sentMessage.id;
        console.log(`Đã thêm 1 partner với ID Message: ${messageID}`);
        const role_Partner = message.guild.roles.cache.get(role_Partners);
        // Gọi hàm addpartner với các tham số
        if(client.partner.addpartner(messageID, tagUser.id, userID, linkserver)){
          const guildMember = message.guild.members.cache.get(tagUser.id);
          await guildMember.roles.add(role_Partner);
          message.reply(`Đã thêm partner thành công!`);
        }
      } catch (error) {
        console.error(error);
        message.reply('Đã xảy ra lỗi khi gửi tin nhắn.');
      }
    } else {
      return message.channel.send('Bạn không phải ICE Partner Manager của ICE để sử dụng lệnh này');
    }
  }
};
