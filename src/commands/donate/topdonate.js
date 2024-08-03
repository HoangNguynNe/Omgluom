const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const moment = require('moment');

let topdonate = [
    `<:ICE_TOP1:1138530570679357522>. `,
    `<:ICE_TOP2:1138530957402570793>. `,
    `<:ICE_TOP3:1138530773146804254>. `,
    `<a:ICE_so4:1127479841785122817>. `,
    `<a:ICE_so5:1127479945451552819>. `,
    `<a:ICE_so6:1127480036484710480>. `,
    `<a:ICE_so7:1127480106831589469>. `,
    `<a:ICE_so8:1127480176708698232>. `,
    `<a:ICE_so9:1127480395651371068>. `,
    `<a:ICE_so1:1127479467212816444><a:ICE_so0:1127480483559768186>. `
];

module.exports = {
    name: "topdonate",
    category: "🔰 Donate",
    aliases: ["tdn", "tdonate"],
    usage: "<PREFIX>tdn",
    description: "Top Donate",
    run: async (client, message, args) => {
        const perPage = 10; // Số lượng donate trên mỗi trang
        let page = 1; // Trang hiện tại
        const totalDonates = await client.donate.allDonateForCurrentMonth(); // Tổng số donate
        const totalPages = Math.ceil(totalDonates.length / perPage);

        // Lấy danh sách donate cho trang hiện tại
        const donates = totalDonates.slice((page - 1) * perPage, page * perPage);
        const embed = await createTopDonateEmbed(donates, page, totalPages, client); // Thêm client vào đây
        const selectMenu = await createSelectMenu(page, totalPages);

        const msg = await message.channel.send({ embeds: [embed], components: [selectMenu] });

        const filter = (interaction) => interaction.customId === 'pagination' && interaction.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (interaction) => {
            if (interaction.values[0] === 'next') {
                if (page < totalPages) {
                    page++;
                }
            } else if (interaction.values[0] === 'previous') {
                if (page > 1) {
                    page--;
                }
            }

            const newDonates = totalDonates.slice((page - 1) * perPage, page * perPage);
            const newEmbed = await createTopDonateEmbed(newDonates, page, totalPages, client); // Thêm client vào đây
            const newSelectMenu = await createSelectMenu(page, totalPages);

            await interaction.update({ embeds: [newEmbed], components: [newSelectMenu] });
        });

        collector.on('end', () => {
            msg.edit({ components: [] }); // Remove the select menu after time expires
        });
    }
};

  async function createSelectMenu(page, totalPages) {
    // Tạo danh sách các lựa chọn với tối đa 2 mục
    const options = [];

    // Thêm lựa chọn "Previous" nếu không phải trang đầu tiên
    if (page > 1) {
        options.push({
            label: 'Previous',
            value: 'previous',
            description: 'Xem trang trước đó',
        });
    }

    // Thêm lựa chọn "Next" nếu không phải trang cuối cùng
    if (page < totalPages) {
        options.push({
            label: 'Next',
            value: 'next',
            description: 'Xem trang tiếp theo',
        });
    }

    // Kiểm tra nếu không có lựa chọn nào
    if (options.length === 0) {
        options.push({
            label: 'No pages available',
            value: 'none',
            description: 'Không có trang nào',
            default: true
        });
    }

    return new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('pagination')
            .setPlaceholder('Chọn trang')
            .addOptions(options)
    );
}

async function createTopDonateEmbed(donates, page, totalPages, client) {
    const embed = new EmbedBuilder()
        .setTitle('<a:ICE_heart:930000437577388082> Top Donate <a:ICE_heart:930000437577388082>')
        .setDescription('<:ICE_chobuon:1131798890719481866> Danh sách các khoản quyên góp hàng đầu')
        .setColor('#0099ff');

    const fields = await Promise.all(donates.map(async (donate, index) => {
        // Fetch the user object using the userID
        const user = await client.users.fetch(donate.userID).catch(() => null);
        // Fallback to userID if user cannot be fetched
        const username = user ? user.username : donate.userID;

        let topne = `Top ${index + 1}. `;
        if (index + 1 <= 10) {
            topne = topdonate[index];
        }

        return {
            name: `${topne} ${username}`,
            value: `<a:ICE_muiten:1021012134274011166> Đã donate: ${donate.totalAmount.toLocaleString()} <a:ICE_owo:920276483640016897>\n<a:ICE_Clock:1130350460499402772> Ngày gần nhất: ${moment(donate.latestDate).format('DD/MM/YYYY')}\n`,
            inline: false
        };
    }));

    embed.addFields(fields); // Use addFields with an array

    embed.setFooter({ text: `Trang ${page} / ${totalPages}` });

    return embed;
}



  
