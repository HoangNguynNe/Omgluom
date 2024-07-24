const fs = require('fs');
const path = require('path');
const { Client, Message, EmbedBuilder } = require('discord.js');
const ROLE_ID = '904584230028316693';

// Đường dẫn đến file responses.txt (điều chỉnh tương đối từ vị trí của file này)
const responsesFilePath = path.join(__dirname, '..', '..', 'functions', 'responses.txt');

module.exports = {
  name: "addresponder",
  category: "🔰 Responder",
  aliases: ["ares", "aresponder"],
  usage: "<PREFIX>aresponder [keywords] <response>",
  description: "Thêm responder",
  run: async (client, message, args) => {
    if (message.author.bot) return;

    // Kiểm tra xem thành viên có vai trò cụ thể không
    const member = message.guild.members.cache.get(message.author.id);
    if (!member || !member.roles.cache.has(ROLE_ID)) {
      return message.reply("Bạn không có quyền sử dụng lệnh này.");
    }

    // Kiểm tra đầu vào của lệnh
    if (args.length < 2) {
      return message.reply("Vui lòng cung cấp cả từ khóa và phản hồi. Ví dụ: `!addresponder [Từ phản hồi] Phản hồi cái gi`");
    }

    // Tách từ khóa và phản hồi từ lệnh
    const content = args.join(' ');
    const keywordMatch = content.match(/\[(.*?)\]/);
    if (!keywordMatch) {
      return message.reply("Vui lòng đặt từ khóa trong dấu []");
    }
    const keywords = keywordMatch[1].toLowerCase(); // Chuyển từ khóa thành chữ thường
    const response = content.replace(keywordMatch[0], '').trim();

    // Cập nhật file responses.txt
    try {
      const data = fs.readFileSync(responsesFilePath, 'utf8');
      const lines = data.split('\n').filter(line => line.trim() !== '');

      // Kiểm tra xem từ khóa đã tồn tại chưa (không phân biệt hoa thường)
      const existingKeywords = lines.find(line => line.split('|')[0].toLowerCase() === keywords);

      if (existingKeywords) {
        return message.reply("Từ khóa này đã tồn tại trong file.");
      }

      // Thêm từ khóa và phản hồi vào file
      fs.appendFileSync(responsesFilePath, `${keywords}|${response}\n`);

      await message.reply(`Đã thêm responder với từ khóa: \`${keywords}\` và phản hồi: \`${response}\``);
    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi thêm responder.');
    }
  }
};
