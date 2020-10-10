const db = require("../config/config");
const fs = require('fs')

const company = {
  getAll: (namaProduk, sort, type, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *, (SELECT COUNT(*) FROM company) AS count, 
            company.id_company as id_company FROM company
            WHERE name_com LIKE '%${namaProduk}%' ORDER BY ${sort} ${type} LIMIT ${offset}, ${limit} `,
        (err, result) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  getDetail: (id_company) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM company WHERE id_company= '${id_company}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  insert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO company (name_com, address_com, image_com) 
            VALUE ('${data.name_com}',
            '${data.address_com}',
            '${data.image_com}')`,
        (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  update: (data, id_company) => {
        return new Promise((resolve, reject) => {
            if(!data.image_com) {
                db.query(`SELECT * FROM company WHERE id_company=${id_company}`, (err, result) => {
                    if(err) {
                        reject(new Error(err));
                    }else {
                        resolve(new Promise((resolve, reject) => {
                            data.image_com = result[0].image_com;
                            db.query(`UPDATE company SET ? WHERE id_company = ?`, [data, id_company], (err, res) => {
                                if(err) {
                                    reject(new Error(err));
                                }else {
                                    resolve(res);
                                }
                            })
                        }))
                    }
                })

            }else {
                db.query(`SELECT * FROM company WHERE id_company=${id_company}`, (err, result) => {
                    if(err) {
                        reject(new Error(err));
                    }else {
                        resolve(new Promise((resolve, reject) => {
                            let imagename = null
                            if(!data.image_com){
                                imagename = result[0].image_com;
                            }else{
                                imagename = data.image_com;
                                fs.unlink(`src/img/${result[0].image_com}`, (err) => {
                                    if(err) throw err;
                                    console.log('Update data success');
                                })
                                db.query(`UPDATE company SET ? WHERE id_company = ?`, [data, id_company], (err, res) => {
                                    if(err) {
                                        reject(new Error(err));
                                    }else {
                                        resolve(res);
                                    }
                                })
                            }
                        }))
                    }
                })
            }
        })
  },
  destroy: (id_company) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM company WHERE id_company='${id_company}'`, (err, result) => {
        if (err) {
          reject(new Error(err.message));
        } else {
          resolve(result);
        }
      });
    });
  }
};

module.exports = company
