const Discord = require("discord.js");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = {
    name: "dovui",
    description: "đoán câu hỏi",

    async run(client, message, args) {
        const time = 60; // seconds
        const winFooter = "BẠN ĐÃ THẮNG!";
        const winColor = "Green";
        const lostColor = "Red";
        const lostFooter = "Bạn đã đoán sai!";
        const questionColor = "Blue";

        // Fetch the question data from the new API
        const response = await fetch(`https://nguyenmanh.name.vn/api/dovui1?apikey=2qHJUPcc`);
        const data = await response.json();

        if (data.status !== 200) {
            return message.reply("Có lỗi khi lấy dữ liệu câu hỏi.");
        }

        const questionData = data.result;
        const question = questionData.questions;
        const answers = {
            a: questionData.a,
            b: questionData.b,
            c: questionData.c,
            d: questionData.d
        };
        const correctAnswer = questionData.dapan;

        // Create the embed for the question
        const que = new Discord.EmbedBuilder()
            .setTitle(`ĐOÁN CÂU HỎI!`)
            .setDescription(question)
            .addFields(
                { name: "A", value: answers.a, inline: true },
                { name: "B", value: answers.b, inline: true },
                { name: "C", value: answers.c, inline: true },
                { name: "D", value: answers.d, inline: true }
            )
            .setColor(questionColor || "Random")
            .setTimestamp();

        // Create the embed for correct answer
        const right = new Discord.EmbedBuilder()
            .setTitle(`Bạn đã đoán đúng!`)
            .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setColor(winColor || "Random")
            .setDescription(`Đáp án đúng là **${correctAnswer}**`)
            .setFooter({ text: winFooter })
            .setTimestamp();

        // Create the embed for wrong answer
        const wrong = new Discord.EmbedBuilder()
            .setTitle(`Bạn đã đoán sai!`)
            .setColor(lostColor || "Random")
            .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setDescription(`Đáp án đúng là **${correctAnswer}**`)
            .setFooter({ text: lostFooter })
            .setTimestamp();

        // Send the question to the channel
        message.reply({ embeds: [que] });

        // Filter to collect only the author's messages
        const gameFilter = (m) => message.author.id === m.author.id;

        // Create a message collector to get the answer
        const gameCollector = message.channel.createMessageCollector({
            filter: gameFilter,
            time: time * 1000,
            max: 1,
        });

        gameCollector.on("collect", async (msg) => {
            if (msg.author.bot) return;
            const selection = msg.content.toLowerCase();

            // Check if the answer is correct
            if (['a', 'b', 'c', 'd'].includes(selection) && answers[selection] === correctAnswer) {
                msg.reply({ embeds: [right] });
            } else {
                msg.reply({ embeds: [wrong] });
            }

            gameCollector.stop();
        });

        gameCollector.on("end", (collected, reason) => {
            if (reason === "time") {
                message.reply("Thời gian hết hạn! Không có ai đoán đúng.");
            }
        });
    }
};
