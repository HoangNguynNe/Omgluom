const { Client, Message, EmbedBuilder } = require('discord.js');
const ROLE_ID = '1147772112472391764';
const ROLE_ID_PARTNER = '894412827933167678';
const TARGET_CHANNEL_ID = '1018355234659119216'; // Thay vì TARGET_GUILD_ID, giờ bạn dùng TARGET_CHANNEL_ID
const role_Partners = '894412827933167678';

module.exports = {
  name: "editpartner",
  category: "🔰 Partner",
  aliases: ["epn", "epartner"],
  usage: "<PREFIX>epn",
  description: "Edit partner",
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
      if(args[0] == 'link'){
        const tagUser = message.mentions.users.first();
        const newlinkserver = args.slice(2).join(' ');

        if (!tagUser || !newlinkserver) {
          return message.reply('Cần người tag và link server. Ví dụ: `ieditpartner @partner linkserver`');
        }

        try {
          const datapartner = await client.partner.getMessageIDByUserPartner(tagUser.id);
        const { messageID, yourPartner } = datapartner;

        if (!messageID) {
          return message.reply('Không tìm thấy messageID tương ứng với userPartner.');
        }


          const existingMessage = await channel.messages.fetch(messageID);
          // Gửi tin nhắn và lấy đối tượng tin nhắn
          await existingMessage.edit(`Key: <@${yourPartner}>\nĐại diện: <@${tagUser.id}>\nLink server: ${newlinkserver}`);

          console.log(`Đã sửa tin nhắn ${messageID} trong kênh ${channel.id}`);

          // Gọi hàm addpartner với các tham số
          try {
            const updateSuccess = await client.partner.editlinkpartner(messageID, newlinkserver);
            if (updateSuccess) {
                message.reply('Link server đã được sửa thành công :3');
            } else {
                message.reply('Đã xảy ra lỗi khi sửa link server.');
            }
        } catch (error) {
            console.error('Lỗi khi gọi editlinkpartner:', error);
            message.reply('Đã xảy ra lỗi khi sửa link server.');
        }
        
        } catch (error) {
          console.error(error);
          message.reply('Đã xảy ra lỗi khi sửa tin nhắn.');
        }
      } else if (args[0] == 'user') {
        const userID = args[1]?.replace(/\D/g, '');
        const userIDNew = args[2]?.replace(/\D/g, '');

        if (!userID || !userIDNew) {
          return message.reply('Cần người tag và partner mới. Ví dụ: `ieditpartner @partner @partnernew`');
          }
          
          const tagUser = message.guild.members.cache.get(userID);
          const tagUserNew = message.guild.members.cache.get(userIDNew);
          
          if (!tagUser || !tagUserNew) {
              return message.reply('Không tìm thấy người dùng tương ứng với ID.');
          }

        try {
            const datapartner = await client.partner.getMessageIDByUserPartner(tagUser.id);
    
            if (!datapartner) {
                return message.reply(`Không tìm thấy dữ liệu đối tác cho userPartner ${tagUser.id}`);
            }

            const { messageID, yourPartner, linkserver } = datapartner;
    
            if (!messageID) {
                return message.reply('Không tìm thấy messageID tương ứng với userPartner.');
            }
    
            const existingMessage = await channel.messages.fetch(messageID);
    
            // Sửa tin nhắn và gửi tin nhắn mới
            await existingMessage.edit(`Key: <@${yourPartner}>\nĐại diện: <@${tagUserNew.id}>\nLink server: ${linkserver}`);
            console.log(`Đã sửa tin nhắn ${messageID} trong kênh ${channel.id}`);
    
            // Gọi hàm edituserpartner với các tham số
            const editSuccess = await client.partner.edituserpartner(messageID, tagUserNew.id);
            if (editSuccess) {
                const guildMemberOld = message.guild.members.cache.get(tagUser.id);
                const guildMemberNew = message.guild.members.cache.get(tagUserNew.id);
    
                if (guildMemberOld) {
                    await guildMemberOld.roles.remove(role_Partners);
                }
                if (guildMemberNew) {
                    await guildMemberNew.roles.add(role_Partners);
                }
                message.reply('User partner server đã được sửa thành công :3');
            } else {
                message.reply('Không thể cập nhật dữ liệu đối tác.');
            }
        } catch (error) {
            console.error(error);
            message.reply('Đã xảy ra lỗi khi sửa tin nhắn.');
        }
    }    
    }
       else if(member.roles.cache.has(ROLE_ID_PARTNER)){
        const userID = message.author.id;
        const newlinkserver = args.slice(2).join(' ');

        if (!newlinkserver) {
          return message.reply('Cần link server. Ví dụ: `ieditpartner linkserver`');
        }

        try {
          const datapartner = await client.partner.getMessageIDByUserPartner(userID);
          const { messageID, yourPartner } = datapartner;

        if (!messageID) {
          return message.reply('Không tìm thấy messageID tương ứng với userPartner.');
        }
        
          const existingMessage = await channel.messages.fetch(messageID);
          // Gửi tin nhắn và lấy đối tượng tin nhắn
          await existingMessage.edit(`Key: <@${yourPartner}>\nĐại diện: <@${userID.id}>\nLink server: ${newlinkserver}`);

          console.log(`Đã sửa tin nhắn ${messageID} trong kênh ${channel.id}`);

          // Gọi hàm addpartner với các tham số
          try {
            const updateSuccess = await client.partner.editlinkpartner(messageID, newlinkserver);
            if (updateSuccess) {
                message.reply('Link server đã được sửa thành công :3');
            } else {
                message.reply('Đã xảy ra lỗi khi sửa link server.');
            }
        } catch (error) {
            console.error('Lỗi khi gọi editlinkpartner:', error);
            message.reply('Đã xảy ra lỗi khi sửa link server.');
        }
        
        } catch (error) {
          console.error(error);
          message.reply('Đã xảy ra lỗi khi sửa tin nhắn.');
        }
    } 
    else {
      return message.channel.send('Bạn không phải ICE Partner Manager của ICE để sử dụng lệnh này');
    }
  }
};
