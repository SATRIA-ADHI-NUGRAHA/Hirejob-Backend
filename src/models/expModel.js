const db = require('../config/config')

const experience = {
    getAll: (position, sort, type) => {
        return new Promise ((resolve, reject) => {
            db.query(`SELECT *, (SELECT COUNT(*) FROM experience) AS count, 
            experience.id_experience as id_experience FROM experience 
            INNER JOIN users ON experience.id_users=users.id_user
            INNER JOIN company ON experience.id_company_exp=company.id_company
            WHERE experience.position LIKE '%${position}%'`, 
            (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getDetail: (id) => {
        return new Promise ((resolve, reject) => {
            db.query(`SELECT * FROM experience WHERE id_users= '${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise ((resolve, reject) => {
            db.query(`INSERT INTO experience (position, time_exp, description_exp, id_users, id_company_exp) 
            VALUE ('${data.position}',
            '${data.time_exp}',
            '${data.description_exp}',
            '${data.id_users}',
            '${data.id_company_exp}')`,
            (err, result) => {
                if(err){
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        })
    },
    update: (data, id) => {
        return new Promise ((resolve, reject) => {
            db.query(`UPDATE experience SET ? WHERE id_experience = ?`, [data, id], 
            (err, result) => {
                if(err){
                    reject(new Error(err.message))
                }else{
                    resolve(result)
                }
            })
        })
    },
    destroy: (id) => {
        return new Promise ((resolve, reject) => {
            db.query(`DELETE FROM experience WHERE id_experience='${id}'`, (err, result) => {
                if(err){
                    reject(new Error(err.message))
                }else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = experience