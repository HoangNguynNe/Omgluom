const fs = require('fs');
const path = require('path');
const diacritics = require('diacritics');

const responsesFilePath = path.join(__dirname, 'responses.txt');
let responses = new Map();

// Hàm để tải các phản hồi từ file
function loadResponses() {
    const data = fs.readFileSync(responsesFilePath, 'utf8');
    
    const newResponses = new Map();
    const lines = data.split('\n');
    
    lines.forEach(line => {
        const [keyword, response] = line.split('|');
        if (keyword && response) {
            newResponses.set(keyword.trim(), response.trim());
        }
    });

    responses = newResponses;
}

// Theo dõi sự thay đổi của file responses.txt
fs.watchFile(responsesFilePath, (curr, prev) => {
    console.log('File responses.txt đã thay đổi. Tải lại dữ liệu...');
    loadResponses();
});

// Tải dữ liệu lần đầu tiên khi khởi động
loadResponses();

async function Chat(client) {
    client.on('messageCreate', async (message) => {

        if (message.author.bot) return;

        // Kiểm tra nếu channel ID là '889331496559722595'
        if (message.channel.id === '889331496559722595') {
            // Gọi phương thức xử lý chat trong client.voicechat
            if (client.voicechat && typeof client.voicechat.chat === 'function') {
                await client.voicechat.chat(message);
            } else {
                console.error('Phương thức chat không tồn tại trong client.voicechat');
            }
        }

        // Xử lý phản hồi tự động
        let response = null;
        const originalMessageContent = message.content.trim();

        // Tìm tất cả các ID người dùng trong tin nhắn
        const userIdMatches = originalMessageContent.match(/<@(\d+)>/g) || [];

        // Tạo danh sách ID duy nhất từ tin nhắn
        const uniqueUserIds = [...new Set(userIdMatches.map(match => match.replace(/<@(\d+)>/, '$1')))];

        let formattedMessageContent = originalMessageContent;
        if (userIdMatches.length > 0) {
            // Thay thế tất cả các <@id> bằng {tag}
            formattedMessageContent = formattedMessageContent.replace(/<@(\d+)>/g, '{tag}');

            // Đảm bảo chỉ có một {tag} trong nội dung tin nhắn
            formattedMessageContent = formattedMessageContent.replace(/{tag}(\s+{tag})+/g, '{tag}');
        }

        // So sánh nội dung tin nhắn đã thay thế với từ khóa
        for (const [keyword, resp] of responses.entries()) {
            const normalizedKeyword = diacritics.remove(keyword.toLowerCase()); // Xóa dấu và chuyển về chữ thường
            const formattedMessageContentNew = diacritics.remove(formattedMessageContent.toLowerCase());
            if (formattedMessageContentNew === normalizedKeyword) {
                response = resp;
                break;
            }
        }

        if (response) {
            try {
                // Tạo mention cho người gửi
                const userMention = `<@${message.author.id}>`;
    
                // Kiểm tra xem phản hồi có chứa {user} không
                if (response.includes('{user}')) {
                    // Thay thế {user} bằng mention của người dùng
                    response = response.replace("{user}", userMention);
                }

                // Thay thế một {tag} bằng tất cả các ID người dùng
                if (uniqueUserIds.length > 0) {
                    const mentions = uniqueUserIds.map(id => `<@${id}>`).join(' ');
                    response = response.replace(/{tag}/, mentions);
                }
                
                await message.reply(response);
            } catch (error) {
                console.error('Đã xảy ra lỗi khi xử lý người dùng:', error);
                await message.reply('Đã xảy ra lỗi khi gửi phản hồi.');
            }
        }
    });
}

module.exports = Chat;
