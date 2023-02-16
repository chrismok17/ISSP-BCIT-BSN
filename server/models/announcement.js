const mysql = require("mysql2");
require("dotenv").config();
const MYSQL_DB = process.env.MYSQL_DB;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const db = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB
  });
  
  db.connect(function(err) {
    if (err) {
        throw err;
    }
  })

const getAnnouncement = () => {
    let sql = `SELECT * FROM announcements`;

    return new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
            if (error) return reject(error);

            return resolve(results);
        })
    })
}

module.exports = { getAnnouncement };