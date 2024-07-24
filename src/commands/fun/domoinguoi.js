const Discord = require('discord.js');
const { Message, Client } = require('discord.js');
const axios = require('axios'); // Để gọi API

module.exports = {
    name: "domoinguoi",
    description: "Ai trả lời nhanh nhất và đúng nhất",

    /**
    *
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    async run (client, message, args) {
        // Lấy câu hỏi từ API
        let questionData;
        try {
            const response = await axios.get('https://nguyenmanh.name.vn/api/msquestion?apikey=jAtDtOsZ');
            questionData = response.data;
        } catch (error) {
            console.error('Error fetching question:', error);
            return message.reply('Đã xảy ra lỗi khi lấy câu hỏi.');
        }

        const { question, answers, correctAnswer } = questionData.result;

        // Tạo câu hỏi và các lựa chọn
        const questionText = `**Câu hỏi:** ${question}\n\n` +
                             `a) ${answers.a}\n` +
                             `b) ${answers.b}\n` +
                             `c) ${answers.c}\n` +
                             `d) ${answers.d}`;

        const waitTime = 15; // Thời gian để trả lời

        // Tạo embed để thông báo chuẩn bị
        let embed = new Discord.EmbedBuilder()
            .setColor('Red')
            .setTitle(`<a:ICE_chattim:930002077386682378> Chuẩn bị! <@${message.author.id}> đã đố mọi người`)
            .setDescription("**` - `**")
            .setFooter({ text: 'Gõ và gửi nhanh chóng khi câu hỏi hiện ra' })
            .setTimestamp();
        const mainMsg = await message.reply({ embeds: [embed] });

        // Thay đổi thông báo khi đến lúc nhập câu trả lời
        setTimeout(() => {
            embed = new Discord.EmbedBuilder()
                .setColor('Yellow')
                .setTitle('<a:ICE_chattim:930002077386682378> Nhập câu trả lời a,b,c,d nhanh nhất!')
                .setDescription(questionText)
                .setFooter({ text: "Gõ và gửi câu trả lời của bạn ( Chỉ được trả lời 1 lần )" })
                .setTimestamp();
            mainMsg.edit({ embeds: [embed] });

            // Tạo bộ lọc để kiểm tra các tin nhắn trả lời
            const filter = (m) => {
                return Object.keys(answers).includes(m.content.toLowerCase()) || Object.values(answers).includes(m.content.toLowerCase());
            };

            const usersAnswered = new Set(); // Theo dõi người đã trả lời
            let answerFound = false;

            const collector = mainMsg.channel.createMessageCollector({ filter, time: waitTime * 1000 });

            // Xử lý khi có người trả lời đúng
            collector.on("collect", (m) => {
                const answer = m.content.toLowerCase();

                // Kiểm tra xem người này đã trả lời chưa
                if (usersAnswered.has(m.author.id)) {
                    return; // Nếu đã trả lời rồi, bỏ qua
                }

                // Thêm người này vào danh sách đã trả lời
                usersAnswered.add(m.author.id);

                if (answer === correctAnswer) {
                    if (!answerFound) {
                        answerFound = true;
                        embed = new Discord.EmbedBuilder()
                            .setColor('Green')
                            .setTitle('<a:ICE_chattim:930002077386682378> Kết thúc!')
                            .setDescription(`<a:ICE_crown2:930112232728199228> ${m.author} đã trả lời đúng với câu trả lời **${answer}**! Chúc mừng!`)
                            .setFooter({ text: "Kết thúc!" })
                            .setTimestamp();
                        mainMsg.edit({ embeds: [embed] });
                        collector.stop();
                    }
                }
            });

            // Xử lý khi hết thời gian trả lời
            collector.on("end", (collected, reason) => {
                if (!answerFound) {
                    embed = new Discord.EmbedBuilder()
                        .setColor('Red')
                        .setTitle('<a:ICE_chattim:930002077386682378> Kết thúc!')
                        .setDescription(`<:ICE_meo:1131803465362972843> Không có ai đã trả lời đúng trong ${waitTime}s qua! Câu trả lời đúng là **${correctAnswer}**.`)
                        .setFooter({ text: "Kết thúc!" })
                        .setTimestamp();
                    mainMsg.edit({ embeds: [embed] });
                }
            });

        }, 3000); // Đợi 3 giây để thông báo chuẩn bị
    }
};
