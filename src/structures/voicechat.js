const MySQL = require('mysql');
const conn = require('../databases/mysql')

class voicechat {
    constructor() { }
    async chat(message){
        conn.query(`SELECT * FROM Msgs WHERE UserID = '${message.author.id}'`, (err, rows) => {
            if(err) throw err;
            if(rows.length > 0) {
                // exists
                conn.query(`UPDATE Msgs SET Msgs = Msgs + 1 WHERE UserID = ${message.author.id}`, (err, rows) => {
                    if(err) throw err;
                });
            } else {
                // not exist
                conn.query(`INSERT INTO Msgs (UserID) VALUES ('${message.author.id}');`, (err) => {
                    if(err) throw err;
                });
            }
        });
    }
    

    async voice(client, oldMember, newMember) {
        const newUserChannel = newMember.channelId; // Đúng trong Discord.js v14
        const oldUserChannel = oldMember.channelId; // Đúng trong Discord.js v14
    
        // Fetch user and member details
        let user = await client.users.fetch(newMember.id, { cache: true });
        let member = await newMember.guild.members.fetch(newMember.id, { cache: true });
    
        // Exit if the user hasn't changed channels
        if (newUserChannel === oldUserChannel) return;
    
        const currentTime = Time(); // Thay đổi để phù hợp với định dạng thời gian
    
        if (oldUserChannel === null) {
            // User joined a channel
            conn.query(
                `INSERT INTO Activity (UserID, ChannelID, JoinTime) VALUES (?, ?, ?)`,
                [newMember.id, newUserChannel, currentTime],
                (err) => {
                    if (err) throw err;
                }
            );
        } else if (newUserChannel === null) {
            // User left a channel
            conn.query(
                `SELECT ID FROM Activity WHERE UserID = ? AND ChannelID = ? ORDER BY ID DESC`,
                [oldMember.id, oldUserChannel],
                (err, rows) => {
                    if (err) throw err;
                    if (rows.length > 0) {
                        conn.query(
                            `UPDATE Activity SET LeftTime = ? WHERE ID = ?`,
                            [currentTime, rows[0].ID],
                            (err) => {
                                if (err) throw err;
                            }
                        );
                    }
                }
            );
        } else {
            // User moved channels
            conn.query(
                `INSERT INTO Activity (UserID, ChannelID, JoinTime) VALUES (?, ?, ?)`,
                [newMember.id, newUserChannel, currentTime],
                (err) => {
                    if (err) throw err;
                }
            );
    
            conn.query(
                `SELECT ID FROM Activity WHERE UserID = ? AND ChannelID = ? ORDER BY ID DESC`,
                [oldMember.id, oldUserChannel],
                (err, rows) => {
                    if (err) throw err;
                    if (rows.length > 0) {
                        conn.query(
                            `UPDATE Activity SET LeftTime = ? WHERE ID = ?`,
                            [currentTime, rows[0].ID],
                            (err) => {
                                if (err) throw err;
                            }
                        );
                    }
                }
            );
        }
    }
    
}

function Time() {
	// Get unix time
	return Math.floor(new Date().getTime() / 1000);
}

module.exports = voicechat;

