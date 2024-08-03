const fs = require('fs');
const path = require('path');
const { Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const ROLE_ID = '904584230028316693';

// Đường dẫn đến file responses.txt (điều chỉnh tương đối từ vị trí của file này)
const responsesFilePath = path.join(__dirname, '..', '..', 'functions', 'responses.txt');
const RESPONDER_PER_PAGE = 20; // Số lượng responder trên mỗi trang

module.exports = {
  name: "listresponder",
  category: "🔰 Responder",
  aliases: ["lres", "listresponses"],
  usage: "<PREFIX>listresponder",
  description: "Hiển thị danh sách các responder hiện có",
  run: async (client, message, args) => {
    if (message.author.bot) return;

    // Kiểm tra xem thành viên có vai trò cụ thể không
    const member = message.guild.members.cache.get(message.author.id);
    if (!member || !member.roles.cache.has(ROLE_ID)) {
      return message.reply("Bạn không có quyền sử dụng lệnh này.");
    }

    // Đọc dữ liệu từ file
    try {
      const data = fs.readFileSync(responsesFilePath, 'utf8');
      const lines = data.split('\n').filter(line => line.trim() !== '');
      
      if (lines.length === 0) {
        return message.reply("Hiện tại không có responder nào.");
      }

      // Tạo embed để hiển thị các responder
      const embed = new EmbedBuilder()
        .setTitle('<a:ICE_meocatnhay:1132868076786946099> Danh Sách Các Responder ICE Z FAMILY <a:ICE_qmusicbeat:920227785539223553>')
        .setColor('#2F3136')
        .setDescription(getDescription(lines, 1))
        .setFooter({ text: 'Trang 1/1' });

      // Tạo các nút điều hướng
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('← Trước')
            .setStyle('Primary')
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Tiếp →')
            .setStyle('Primary')
        );

      const messageToEdit = await message.reply({ embeds: [embed], components: [row] });

      const filter = interaction => {
        return ['prev', 'next'].includes(interaction.customId) && interaction.user.id === message.author.id;
      };

      const collector = messageToEdit.createMessageComponentCollector({ filter, time: 60000 });

      let currentPage = 1;
      const totalPages = Math.ceil(lines.length / RESPONDER_PER_PAGE);

      collector.on('collect', async (interaction) => {
        if (interaction.customId === 'next') {
          currentPage = Math.min(currentPage + 1, totalPages);
        } else if (interaction.customId === 'prev') {
          currentPage = Math.max(currentPage - 1, 1);
        }

        embed.setDescription(getDescription(lines, currentPage))
             .setFooter({ text: `Trang ${currentPage}/${totalPages}` });

        row.components[0].setDisabled(currentPage === 1);
        row.components[1].setDisabled(currentPage === totalPages);

        await interaction.update({ embeds: [embed], components: [row] });
      });

      collector.on('end', collected => {
        row.components[0].setDisabled(true);
        row.components[1].setDisabled(true);
        messageToEdit.edit({ components: [row] });
      });

    } catch (error) {
      console.error(error);
      message.reply('Đã xảy ra lỗi khi hiển thị danh sách responder.');
    }
  }
};

// Hàm để lấy mô tả của các responder cho trang hiện tại
function getDescription(lines, page) {
  const start = (page - 1) * RESPONDER_PER_PAGE;
  const end = Math.min(start + RESPONDER_PER_PAGE, lines.length);
  return lines.slice(start, end).map(line => {
    const [keyword, response] = line.split('|');
    return `**Từ khóa:** ${keyword}\n**Phản hồi:** ${response}`;
  }).join('\n\n');
}
