const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "timkiem1",
    description: "Tìm kiếm hình ảnh từ Pixabay",
    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply('Vui lòng cung cấp từ khóa để tìm kiếm hình ảnh!');
        }

        const query = args.join(' ');
        const PIXABAY_API_KEY = '38236984-1d8d8c99f6f571be6bc5a4a2f';  // Thay thế bằng API key của bạn

        try {
            const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`);
            const data = await response.json();

            if (data.hits.length === 0) {
                return message.reply('Không tìm thấy hình ảnh nào với từ khóa này.');
            }

            const image = data.hits[0];  // Lấy hình ảnh đầu tiên trong kết quả

            const embed = new EmbedBuilder()
                .setTitle(`Hình ảnh cho từ khóa: ${query}`)
                .setImage(image.largeImageURL)
                .setFooter({ text: `Nguồn: Pixabay` })
                .setColor('#2F3136');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching image from Pixabay:', error);
            message.reply('Đã có lỗi xảy ra khi tìm kiếm hình ảnh.');
        }
    }
};
