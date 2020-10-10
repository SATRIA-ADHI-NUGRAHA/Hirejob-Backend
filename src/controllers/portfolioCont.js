const portfolioModel = require('../models/portofolioModel')
const { success, failed } = require('../helpers/response')
const upload = require ('../helpers/upload')
const fs = require('fs')

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
    portfolioModel.findOne(id)
      .then(result => {
        success(res, result, 'get portfolio success')
      }).catch(err => {
        failed(res, [], err.message)
      })
  },
  insertOne: (req, res) => {
    upload.single('image')(req, res, (err) => {
      if(err){
        if(err.code === 'LIMIT_FILE_SIZE'){
          failed(res, [], 'File size max 1000 KB')
        }else{
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
    upload.single('image')(req, res, (err) => {
      if(err){
        if(err.code === 'LIMIT_FILE_SIZE'){
          failed(res, [], 'File size max 1000 KB')
        }else{
          failed(res, [], err)
        }
      } else {
        const id = req.params.id
        const body = req.body
        body.image = !req.file ? '' : req.file.filename
        if(!body.image) {
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
                if(err) {
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
  }
}