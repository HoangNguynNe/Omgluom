const fs = require('fs');
const path = require('path');

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
        const messageContent = message.content.trim().toLowerCase();

        for (const [keyword, resp] of responses.entries()) {
            if (messageContent === keyword) {
                response = resp;
                break;
            }
        }

        if (response) {
            await message.reply(response);
        }
    });
}

module.exports = Chat;
