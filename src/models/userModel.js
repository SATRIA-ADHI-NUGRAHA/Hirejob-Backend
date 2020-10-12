const db = require('../config/config')

const user = {
    register: (data, generate, image, level) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (name_user, email, password,no_hp, image, role) VALUES('${data.name}', '${data.email}', '${generate}','${data.handphone}', '${level}', '${image}')`, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = ?`, data.email, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },
    loginToken: (token, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET refress='${token}' WHERE id_user=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET status= 1 WHERE email='${email}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getOne: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id_user=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateUser: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET ? WHERE id_user = ${id}`, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE id_user=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    searchEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email="${email}"`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateKey: (key, email) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET pass_key="${key}" WHERE email="${email}"`, (err, result) => {
                if(err) {
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    },
    setPass: (password, key) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET password='${password}', pass_key=null WHERE key_pass='${key}'`, (err, result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getAll: (name, sort, typesort, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *, (SELECT COUNT(*) FROM users) as count FROM users WHERE role=0`, (err, result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    userGet: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = user