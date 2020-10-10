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
      db.query(`SELECT * FROM portfolio WHERE id_portfolio=${id}`, (err, res) => {
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
      db.query(`ISERT INTO porfolio SET ?`, data, (err, res) => {
        if(err) {
          reject(new Error(err))
        } else {
          resolve(res)
        }
      })
    })
  }
}