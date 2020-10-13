const db = require('../config/config')

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portfolio`, (err, res) => {
        if(err) {
          reject(new Error(err))
        } else {
          resolve(res)
        }
      })
    })
  },
  findOne: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portfolio WHERE id_user=${id}`, (err, res) => {
        if(err) {
          reject(new Error(err))
        } else {
          resolve(res)
        }
      })
    })
  },
  isertOne: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO portfolio SET ?`, data, (err, res) => {
        if(err) {
          reject(new Error(err))
        } else {
          resolve(res)
        }
      })
    })
  },
  updateOne: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE portfolio SET ? WHERE id_portfolio = ?`, [data, id], (err, res) => {
        if(err) {
          reject(new Error(err))
        } else {
          resolve(res)
        }
      })
    })
  },
  getOne: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portfolio WHERE id_portfolio=${id}`, (err, res) => {
        if(err) {
          reject(new Error(err))
        } else {
          resolve(res)
        }
      })
    })
  },
}