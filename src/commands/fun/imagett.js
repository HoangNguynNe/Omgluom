const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

const GOOGLE_API_KEY = 'AIzaSyDa-CQiQtgnwWwkR50oHg7GM3ZIXlVhDQU'; // Thay bằng API key của bạn
const CX = '042b4a7d66ba94dea'; // Thay bằng Custom Search Engine ID của bạn

module.exports = {
    name: "timkiem",
    aliases: ["timkiemanh", "searchimage"],
    description: "Tìm kiếm hình ảnh từ Google",
    run: async (client, message, args) => {
        if (!args.length) {
            return message.reply('Vui lòng cung cấp từ khóa để tìm kiếm hình ảnh!');
        }

        const query = args.join(' ');
        const maxRetries = 3; // Số lần thử tối đa
        let attempt = 0;
        let image = null;

        while (attempt < maxRetries && !image) {
            attempt++;
            try {
                const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
                    params: {
                        key: GOOGLE_API_KEY,
                        cx: CX,
                        searchType: 'image',
                        q: query,
                        num: 1,
                        start: attempt // Thử từ trang tiếp theo nếu ảnh không tồn tại
                    }
                });

                if (response.data.items.length > 0) {
                    image = response.data.items[0];
                }
            } catch (error) {
                console.error(`Error fetching image from Google (attempt ${attempt}):`, error);
            }
        }

        if (!image) {
            return message.reply('Không tìm thấy hình ảnh nào với từ khóa này.');
        }

        const embed = new EmbedBuilder()
            .setTitle(`Hình ảnh cho từ khóa: ${query}`)
            .setImage(image.link)
            .setFooter({ text: `Nguồn: Google` })
            .setColor('#2F3136');

        message.channel.send({ embeds: [embed] });
    }
};
