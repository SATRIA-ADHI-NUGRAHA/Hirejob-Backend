const companyModels = require('../models/companyModels')
const { success, failed, successWithMeta } = require('../helpers/response')
const upload = require ('../helpers/upload')

const companyController = {
    getAll: (req, res) => {
        const search = !req.query.search?'' : req.query.search
        const sort = !req.query.sort?'id_company' : req.query.sort
        const type = !req.query.sort?'ASC' : req.query.type
        const limit = !req.query.limit? 9 : parseInt(req.query.limit)
        const page = !req.query.page? 1 : parseInt(req.query.page)
        const offset = page===1? 0 : (page-1)*limit
        companyModels.getAll(search, sort, type, limit, offset)
        .then((result) => {

            const totalRow = result[0].count
            const meta = {
                totalRow: totalRow,
                totalPage: Math.ceil(totalRow/limit),
                limit,
                page
            }
            successWithMeta(res, result, meta, 'Get all company success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    getDetail: (req, res) => {
        const id_company = req.params.id_company
        companyModels.getDetail(id_company)
        .then((result) => {
            success(res, result, 'Get Detail company success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    insert: (req, res) => {
      upload.single('image_com')(req, res, (err) => {
        if(err){
            if(err.code === 'LIMIT_FILE_SIZE'){
                failed(res, [], 'File size max 1000 KB')
            }else{
                failed(res, [], err)
            }
        }else{
            const body = req.body
            body.image_com = !req.file?req.file:req.file.filename
            companyModels.insert(body)
            .then((result) => {
                success(res, result, 'Data company dimasukkan')
                // console.log(result)
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        }
      })
    },
    update: (req, res) => {
        const id_company = req.params.id_company
        const body = req.body
        body.image_com = !req.file ? '': req.file.filename
        companyModels.update(body, id_company)
        .then((result) => {
            success(res, result, 'Update company success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    },
    destroy: (req, res) => {
        const id_company =  req.params.id_company
        companyModels.destroy(id_company)
        .then((result) => {
            success(res, result, 'Delete company success')
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = companyController