const jwt = require('jsonwebtoken')
const { SECRETKEY } = require('../helpers/env')
const { tokenStatus } = require('../helpers/response')

const auth = {
    authenticate: (req, res, next) => {
        const token = req.headers.token
        if (token === "undefined" || token === '') {
            tokenStatus(res, [], 'Token undetected. Please insert token!')
        } else {
            next()
        }
    },
    admin: (req, res, next) => {
        const token = req.headers.token;
        jwt.verify(token, SECRETKEY, (err, decode) => {
            if (err && err.name === 'JsonWebTokenError') {
                res.status(500)
                res.send({
                    code: 500,
                    msg: 'Invalid token'
                })
            } else if (err && err.name === 'TokenExpiredError') {
                res.status(401)
                res.send({
                    msg: 'failed, token expired'
                })
            } else {
                if (decode.level === 1) {
                    next()
                } else {
                    res.status(403)
                    res.send({
                        msg: 'Access Denied'
                    })
                }
            }
        })
    },
    authorize: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, SECRETKEY, (err) => {
            if (err && err.name === 'TokenExpiredError') {
                tokenStatus(res, [], 'Token Expired! Please log in again')
            } else if (err && err.name === 'JsonWebTokenError') {
                tokenStatus(res, [], 'Authorization Failed!')
            } else {
                next()
            }
        })

    }
}

module.exports = auth