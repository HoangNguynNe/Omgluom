const MySQL = require('mysql');
const sql = require('../databases/mysql')

class Partner {
    constructor() { }
    async addpartner(messageID, userPartner, yourPartner, linkserver){
        return new Promise((resolve, reject) => {
            sql.query(
                'INSERT INTO `partner` (`userPartner`, `yourPartner`, `messageID`, `linkserver`) VALUES (?,?,?,?)',
                [userPartner,yourPartner,messageID,linkserver],
                (err, res) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(true);
                }
            );
        });
    }

    async editlinkpartner(messageID, linkserver) {
        return new Promise((resolve, reject) => {
            sql.query(
                'UPDATE `partner` SET `linkserver` = ? WHERE `messageID` = ?',
                [linkserver, messageID],
                (err, res) => {
                    if (err) {
                        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', err);
                        return reject(false);
                    }
                    if (res.affectedRows === 0) {
                        console.warn(`Không tìm thấy bản ghi để cập nhật. Có thể messageID không đúng. ${messageID}`);

                        return resolve(false); // Không có bản ghi nào được cập nhật
                    }
                    resolve(true); // Thành công
                }
            );
        });
    }
    
    async edituserpartner(messageID, userPartner) {
        return new Promise((resolve, reject) => {
            sql.query(
                'UPDATE `partner` SET `userPartner` = ? WHERE `messageID` = ?',
                [userPartner, messageID],
                (err, res) => {
                    if (err) {
                        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', err);
                        return reject(false);
                    }
                    if (res.affectedRows === 0) {
                        console.warn(`Không tìm thấy bản ghi để cập nhật. Có thể messageID không đúng. ${messageID}`);

                        return resolve(false); // Không có bản ghi nào được cập nhật
                    }
                    resolve(true); // Thành công
                }
            );
        });
    }

    async deletepartner(messageID) {
        return new Promise((resolve, reject) => {
            sql.query(
                'DELETE FROM `partner` WHERE `messageID` = ?',
                [messageID],
                (err, res) => {
                    if (err) {
                        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', err);
                        return reject(false);
                    }
                    if (res.affectedRows === 0) {
                        console.warn(`Không tìm thấy bản ghi để cập nhật. Có thể messageID không đúng. ${messageID}`);
                        return resolve(false); // Không có bản ghi nào được cập nhật
                    }
                    resolve(true); // Thành công
                }
            );
        });
    }

    async getMessageIDByUserPartner(userPartner) {
        return new Promise((resolve, reject) => {
            sql.query(
                'SELECT `messageID`,`yourPartner`,`linkserver` FROM `partner` WHERE `userPartner` = ?',
                [userPartner],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    if (results.length > 0) {
                        resolve({
                            messageID: results[0].messageID,
                            yourPartner: results[0].yourPartner,
                            linkserver: results[0].linkserver
                        });
                    } else {
                        resolve(null); // Không tìm thấy messageID
                    }
                }
            );
        });
    }
    
}

module.exports = Partner;

