const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "timkiem3",
    description: "Tìm kiếm hình ảnh từ Pexels",
    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply('Vui lòng cung cấp từ khóa để tìm kiếm hình ảnh!');
        }

        const query = args.join(' ');
        const PEXELS_API_KEY = 'MScTSOdm3xyr7G3CNEpAK8SmMPfGOl314wdfq6Gwx3qvipCiKFu6W1zE';  // Thay thế bằng API key của bạn

        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
                headers: {
                    Authorization: PEXELS_API_KEY
                }
            });
            const data = await response.json();

            if (data.photos.length === 0) {
                return message.reply('Không tìm thấy hình ảnh nào với từ khóa này.');
            }

            const image = data.photos[0];  // Lấy hình ảnh đầu tiên trong kết quả

            const embed = new EmbedBuilder()
                .setTitle(`Hình ảnh cho từ khóa: ${query}`)
                .setImage(image.src.large)
                .setFooter({ text: `Nguồn: Pexels` })
                .setColor('#2F3136');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching image from Pexels:', error);
            message.reply('Đã có lỗi xảy ra khi tìm kiếm hình ảnh.');
        }
    }
};
