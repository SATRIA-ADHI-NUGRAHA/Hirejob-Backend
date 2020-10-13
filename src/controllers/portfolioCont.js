const portfolioModel = require('../models/portofolioModel')
const { success, failed } = require('../helpers/response')
const upload = require('../helpers/upload')
const fs = require('fs')
const userModel = require('../models/userModel')

module.exports = {
  findAll: (req, res) => {
    portfolioModel.findAll()
      .then(result => {
        success(res, result, 'get data portfolio success')
      }).catch(err => {
        failed(res, [], err.message)
      })
  },
  findOne: (req, res) => {
    const id = req.params.id;
    userModel.getOne(id)
      .then((result) => {
        const data = result[0]
        if (data === undefined) {
          failed(res, [], "User Not Found")
        } else {
          portfolioModel.findOne(id)
            .then(result => {
              const dat = result[0]
              if (!dat) {
                failed(res, [], "Please add portofolio")
              } else {
                success(res, result, 'get data portfolio success')
              }
            }).catch(err => {
              failed(res, [], err.message)
            })
        }
      })
  },
  insertOne: (req, res) => {
    upload.single('image_port')(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          failed(res, [], 'File size max 1000 KB')
        } else {
          failed(res, [], err)
        }
      } else {
        const body = req.body
        body.image = !req.file ? req.file : req.file.filename
        portfolioModel.isertOne({
          name_app: body.name_app,
          id_user: body.id_user,
          type_portfolio: body.type_portfolio,
          image_port: body.image,
          repository_link: body.repository_link
        }).then(result => {
          success(res, result, 'insert portfolio success')
        }).catch(err => {
          failed(res, [], err.message)
        })
      }
    })
  },
  updateOne: (req, res) => {
    const body = req.bod
    upload.single('image_port')(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          failed(res, [], 'File size max 1000 KB')
        } else {
          failed(res, [], err)
        }
      } else {
        const id = req.params.id
        const body = req.body
        body.image_port = !req.file ? null : req.file.filename
        if (body.image_port === null) {
          portfolioModel.updateOne(body, id)
            .then(result => {
              success(res, result, 'update data success')
            }).catch(err => {
              failed(res, [], err.message)
            })
        } else {
          portfolioModel.findOne(id)
            .then(result => {
              const oldImage = result[0].image_port
              fs.unlink(`src/img/${oldImage}`, (err) => {
                if (err) {
                  failed(res, [], err.message)
                } else {
                  portfolioModel.updateOne(body, id)
                    .then(result => {
                      success(res, result, 'update data success')
                    }).catch(err => {
                      failed(res, [], err.message)
                    })
                }
              })
            })
        }
      }
    })
  },
  destroy: (req, res) => {
      const id =  req.params.id
      portfolioModel.destroy(id)
      .then((result) => {
          success(res, result, 'Delete portfolio success')
      })
      .catch((err) => {
          failed(res, [], err.message)
      })
  }
}