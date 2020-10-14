const db = require('../config/config')

module.exports = {
    // getAll: () => {
    //   return new Promise((resolve, reject) => {
    //     db.query(`SELECT *, (SELECT COUNT(*) FROM friend) AS count, 
    //     friend.id as id FROM friend
    //     WHERE name_com LIKE '%${namaProduk}%' ORDER BY ${sort} ${type} LIMIT ${offset}, ${limit}`,
    //       (err, result) => {
    //         if (err) {
    //           reject(new Error(err));
    //         } else {
    //           resolve(result);
    //         }
    //       }
    //     )
    //   })
    // },
    // getOneFriend: (id) => {
    //   return new Promise((resolve, reject) => {
    //     db.query(`SELECT * FROM friend WHERE id=${id}`, (err, res) => {
    //       if(err) {
    //         reject(new Error(err))
    //       } else {
    //         resolve(res)
    //       }
    //     })
    //   })
    // },
    // insertFriend: (data) => {
    //   return new Promise((resolve, reject) => {
    //     db.query(`INSERT INTO friend SET ?`, data, (err, res) => {
    //       if(err) {
    //         reject(new Error(err))
    //       } else {
    //         resolve(res)
    //       }
    //     })
    //   })
    // },
    getOne: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM friend WHERE id=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addFriends: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO friend (id_user, id_friend) VALUES('${data.id_user}','${data.id_friend}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    db.query(`INSERT INTO friend (id_user, id_friend) VALUES('${data.id_friend}','${data.id_user}')`, (err, result) => {
                        if (err) {
                            reject(new Error(err))
                        } else {
                            resolve(result)
                        }
                    })
                }
            })
        })
    },
    getFriends: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users INNER JOIN friend on users.id_user = friend.id_user WHERE id_friend=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insertChat: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO message (sender, receiver, message) VALUES ('${data.sender}', '${data.receiver}', '${data.message}')`, (err, result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getMessage: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM message WHERE (sender='${data.sender}' AND receiver='${data.receiver}') OR (sender='${data.receiver}' AND receiver='${data.sender}')`,(err, result) => {
                if(err) {
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    }
}
