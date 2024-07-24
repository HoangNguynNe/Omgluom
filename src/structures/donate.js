const MySQL = require('mysql');
const sql = require('../databases/mysql')

class Donate {
    constructor() { }
    async addDonate(userDonate, moneyowo) {
        return new Promise((resolve, reject) => {
            sql.query(
                'INSERT INTO `donate` (`userID`, `moneyowo`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `moneyowo` = `moneyowo` + VALUES(`moneyowo`)',
                [userDonate, moneyowo],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(true); // Đã chèn hoặc cập nhật thành công
                }
            );
        });
    }   

    async allDonateForCurrentMonth(page = 1, perPage = 10) {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * perPage;
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // Tháng hiện tại (1-12)
            const currentYear = now.getFullYear(); // Năm hiện tại
    
            // Câu truy vấn SQL để nhóm kết quả theo userID, tính tổng số tiền donate trong tháng hiện tại và lấy ngày donate gần nhất
            const query = `
                SELECT userID, SUM(moneyowo) AS totalAmount, MAX(Date) AS latestDate
                FROM donate
                WHERE MONTH(Date) = ? AND YEAR(Date) = ?
                GROUP BY userID
                ORDER BY totalAmount DESC
                LIMIT ? OFFSET ?
            `;
    
            sql.query(query, [currentMonth, currentYear, perPage, offset], (err, results) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
    
                resolve(results);
            });
        });
    }
    
    

    async InfoDonate(userID, month) {
        return new Promise((resolve, reject) => {
            sql.query(
                'SELECT * FROM `donate` WHERE `userID` = ? AND MONTH(`Date`) = ? ORDER BY `Date` DESC LIMIT 15',
                [userID, month],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });
    }
    
    

    async getDonateMonths(userID) {
        return new Promise((resolve, reject) => {
            sql.query(
                'SELECT DISTINCT MONTH(`Date`) AS `month` FROM `donate` WHERE `userID` = ?',
                [userID],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    resolve(results.map(row => row.month));
                }
            );
        });
    }
    
    
    
    
    
}

module.exports = Donate;

