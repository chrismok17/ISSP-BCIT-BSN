const mysql = require("mysql2");
const bcrypt = require("bcrypt");

/*
userid, email, password need to be changed to user's
input when implementing register.
*/

const password = "jace123!"

const encryption = (password) => {
    
    bcrypt
        .genSalt(10)
        .then(salt => {
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            const db = mysql.createConnection({
                host: "143.198.158.241",
                user: "bsnmysql",
                password: "bcitbsn491",
                database: "bcit_bsn"
            });
            
            db.connect(function(err) {
                if (err) {
                    throw err;
                }
                console.log("Connected");
            })
            
            //change userid, email, password to test
            let sql = `INSERT INTO users (userid, email, password) VALUES ('1', 'jace@gmail.com', '${hash}')`;
            //let sql = `SELECT * FROM users WHERE email=jace@gmail.com`;
            
            db.query(sql, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                console.log(results);
            })
            
            db.end();
        })
        .then(hash => {
            validate(hash)
        })
        .catch(err => console.error(err.message))
    
    const validate = (hash) => {
        bcrypt
            .compare(password, hash)
            .then(res => {
                return res
            })
            .catch(err => console.error(err.message))
    }
}
encryption(password)
