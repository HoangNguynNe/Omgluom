const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "infodonate",
    category: "🔰 Donate",
    aliases: ["idn", "i4dn"],
    usage: "<PREFIX>idn",
    description: "Info Donate",
    run: async (client, message, args) => {
        const userID = message.author.id; // Giả sử bạn muốn lấy dữ liệu cho người dùng gửi tin nhắn
        const currentMonth = new Date().getMonth() + 1; // Tháng hiện tại
        const currentDonates = await client.donate.InfoDonate(userID, currentMonth);
        const selectMenu = await createSelectMenu(client, userID);
        const embed = await createTopDonateEmbed(currentDonates, currentMonth, client, userID);

        const msg = await message.channel.send({ embeds: [embed], components: [selectMenu] });

        const filter = (interaction) => interaction.customId === 'selectMonth' && interaction.user.id === userID;
        const collector = msg.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (interaction) => {
            const month = parseInt(interaction.values[0], 10);
            const donates = await client.donate.InfoDonate(userID, month);
            const newEmbed = await createTopDonateEmbed(donates, month, client, userID);

            await interaction.update({ embeds: [newEmbed], components: [selectMenu] });
        });

        collector.on('end', () => {
            msg.edit({ components: [] }); // Remove the select menu after time expires
        });
    }
};

async function createSelectMenu(client, userID) {
    const months = await client.donate.getDonateMonths(userID);
    const currentMonth = new Date().getMonth() + 1; // Tháng hiện tại

    const options = months
        .filter(month => month !== currentMonth) // Loại bỏ tháng hiện tại
        .map(month => ({
            label: `Tháng ${month}`,
            value: month.toString(),
            description: `Xem donate trong tháng ${month}`
        }))
        .slice(0, 25); // Đảm bảo không vượt quá 25 lựa chọn

    if (options.length === 0) {
        options.push({
            label: 'No months available',
            value: 'none',
            description: 'Không có tháng nào để chọn'
        });
    }

    return new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('selectMonth')
            .setPlaceholder('Chọn tháng')
            .addOptions(options)
    );
}


async function createTopDonateEmbed(donates, month, client, userID) {
    // Fetch the user details to get the avatar
    const user = await client.users.fetch(userID).catch(() => null);
    const username = user ? user.tag : `ID: ${userID}`;
    const avatarURL = user ? user.displayAvatarURL() : ''; // Get the user's avatar URL

    // Create the embed
    const embed = new EmbedBuilder()
        .setTitle(`Donate Tháng ${month} của ${username}`)
        .setDescription('Danh sách các khoản quyên góp gần đây')
        .setColor('#0099ff')
        .setThumbnail(avatarURL); // Set the user's avatar as the thumbnail

    // Sort and slice the donates
    donates.sort((a, b) => new Date(b.Date) - new Date(a.Date)).slice(0, 15);

    // Map the donates to embed fields
    const fields = donates.map(donate => {
        const donateDate = moment(donate.Date).format('DD/MM/YYYY'); // Only date, no time
        const duration = moment.duration(moment().diff(moment(donate.Date)));

        // Format time ago based on values
        let timeAgo = '';
        if (duration.days() > 0) {
            timeAgo = `${duration.days()} ngày ${duration.hours()} giờ ${duration.minutes()} phút ${duration.seconds()} giây trước`;
        } else if (duration.hours() > 0) {
            timeAgo = `${duration.hours()} giờ ${duration.minutes()} phút ${duration.seconds()} giây trước`;
        } else if (duration.minutes() > 0) {
            timeAgo = `${duration.minutes()} phút ${duration.seconds()} giây trước`;
        } else {
            timeAgo = `${duration.seconds()} giây trước`;
        }

        const formattedMoneyowo = donate.moneyowo.toLocaleString('vi-VN');

        return {
            name: `<a:ICE_muiten:1021012134274011166> ${formattedMoneyowo} <a:ICE_owo:920276483640016897>`,
            value: `<a:ICE_Clock:1130350460499402772> Ngày: ${donateDate}\n(${timeAgo})\n`, // Add a new line for spacing
            inline: false // Display each donation in a separate row
        };
    });

    embed.addFields(fields);
    return embed;
}



