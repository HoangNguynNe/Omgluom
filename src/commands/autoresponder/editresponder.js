const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'editresponder',
  category: '🔰 Responder',
  aliases: ['eres', 'eresponder'],
  usage: '<PREFIX>eresponder [keyword] <newResponse>',
  description: 'Sửa responder',
  run: async (client, message, args) => {
    if (message.author.bot) return;

    const content = args.join(' ');
    const keywordMatch = content.match(/\[(.*?)\]/);
    if (!keywordMatch) {
      return message.reply("Vui lòng đặt từ khóa trong dấu []");
    }
    const keywords = keywordMatch[1].toLowerCase(); // Chuyển từ khóa thành chữ thường
    const newResponse = content.replace(keywordMatch[0], '').trim(); // Phản hồi mới

    const filePath = path.join(__dirname, '../../functions/responses.txt');
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    let found = false;
    const updatedLines = lines.map(line => {
      const [currentKeyword, response] = line.split('|');
      if (currentKeyword && response && currentKeyword.trim().toLowerCase() === keywords) {
        found = true;
        return `${currentKeyword}|${newResponse}`;
      }
      return line;
    });

    if (!found) {
      return message.reply('Không tìm thấy từ khóa này.');
    }

    fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
    await message.reply(`Đã cập nhật responder với từ khóa: \`${keywords}\` và phản hồi mới: \`${newResponse}\``);
  }
};
