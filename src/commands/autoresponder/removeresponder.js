const fs = require('fs');
const path = require('path');
const { Client, Message, EmbedBuilder } = require('discord.js');
const ROLE_ID = '904584230028316693';

// Đường dẫn đến file responses.txt (điều chỉnh tương đối từ vị trí của file này)
const responsesFilePath = path.join(__dirname, '..', '..', 'functions', 'responses.txt');

module.exports = {
  name: "rmresponder",
  category: "🔰 Responder",
  aliases: ["rres", "removeresponder"],
  usage: "<PREFIX>rmresponder <keywords>",
  description: "Xóa responder",
  run: async (client, message, args) => {
    if (message.author.bot) return;

    // Kiểm tra xem thành viên có vai trò cụ thể không
    const member = message.guild.members.cache.get(message.author.id);
    if (!member || !member.roles.cache.has(ROLE_ID)) {
      return message.reply("Bạn không có quyền sử dụng lệnh này.");
    }

    // Kiểm tra đầu vào của lệnh
    if (args.length === 0) {
      return message.reply("Vui lòng cung cấp từ khóa để xóa. Ví dụ: `!rmresponder Ủa alo Nguyên ơi`");
    }

    // Tách từ khóa từ lệnh
    const keywords = args.join(' ').toLowerCase(); // Chuyển từ khóa thành chữ thường

    try {
      const data = fs.readFileSync(responsesFilePath, 'utf8');
      const lines = data.split('\n').filter(line => line.trim() !== '');

      // Tìm và loại bỏ dòng chứa từ khóa muốn xóa
      const updatedLines = lines.filter(line => line.split('|')[0].toLowerCase() !== keywords);

      if (updatedLines.length === lines.length) {
        return message.reply("Từ khóa này không tồn tại trong file.");
      }

      // Ghi nội dung cập nhật vào file
      fs.writeFileSync(responsesFilePath, updatedLines.join('\n') + '\n');

      await message.reply(`Đã xóa responder với từ khóa: \`${keywords}\``);
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi xóa responder.');
    }
  }
};
