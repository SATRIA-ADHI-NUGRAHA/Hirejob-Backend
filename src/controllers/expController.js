const expModel = require('../models/expModel')
const userModel = require('../models/userModel')
const { success, failed, successWithMeta } = require('../helpers/response')

const category = {
    getAll: (req, res) => {
        const position = !req.query.position ? '' : req.query.position
        const sort = !req.query.sort ? 'position' : req.query.sort
        const type = !req.query.sort ? 'DESC' : req.query.type
        const limit = !req.query.limit ? 9 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)
        const offset = page === 1 ? 0 : (page - 1) * limit
        expModel.getAll(position, sort, type, limit, offset)
            .then((result) => {

                const totalRow = result[0].count
                const meta = {
                    totalRow: totalRow,
                    totalPage: Math.ceil(totalRow / limit),
                    limit,
                    page
                }
                successWithMeta(res, result, meta, 'Get all category success')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    getExp: (req, res) => {
        const id = req.params.id
        userModel.getOne(id)
            .then((result) => {
                const user = result[0]
                if (!user) {
                    failed(res, 'User Not Found')
                } else {
                    const idUser = result[0].id_user
                    expModel.getDetail(idUser)
                        .then((result) => {
                            const dat = result[0]
                            if (!dat) {
                                failed(res, [], "Please add expreience")
                            } else {
                                success(res, result, 'Get experience success')
                            }
                            })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                }
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    getDetail: (req, res) => {
        const id = req.params.id
        expModel.getDetail(id)
            .then((result) => {
                success(res, result, 'Get experience success')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    insert: (req, res) => {
        const body = req.body
        expModel.insert(body)
            .then((result) => {
                success(res, result, 'Insert Experience is done')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    update: (req, res) => {
        const id = req.params.id
        const body = req.body
        expModel.update(body, id)
            .then((result) => {
                // console.log(result)
                success(res, result, 'Update Experience Success')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    destroy: (req, res) => {
        const id = req.params.id
        expModel.destroy(id)
            .then((result) => {
                success(res, result, 'Delete Experience Success')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    }
}

module.exports = category