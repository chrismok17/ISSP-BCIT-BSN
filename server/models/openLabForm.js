const db = require("./index")

const dataForm = {
    findMonth: (month) => {
        let sql = `SELECT * FROM calendar WHERE MONTH(date) = '${month}'`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                console.log("error ANND results", err, results);
                if (err) return reject(err);

                if (results.length !== 0) {
                    return resolve(results);
                }
                reject(new Error(`Couldn't find month: '${month}'`));
            })
        })
    },
    updateCalendar: (forms) => {
        const queryArray = forms.map((form) => {
            return `INSERT INTO calendar VALUES (null, '${form.date}', '${form["start-time"]}', '${form["end-time"]}', '${form["facilitator"]}', '${form["room-number"]}', '${form["stat"]}' )`})
        return Promise.all(queryArray.map((sql) => {
            return new Promise((resolve, reject) => {
                db.query(sql, (err, results) => {
                    console.log("error ANND results", err, results);
                    if (err) return reject(err);
    
                    if (results.length !== 0) {
                        return resolve(results);
                    }
                    reject(new Error(`Couldn't find month: '${month}'`));
                })
            })
        })).then((responseArr) => {
            console.log("response array", responseArr)
            return responseArr
        })
    }
}

module.exports = dataForm;