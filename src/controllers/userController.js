const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')
const sendMail = require('../helpers/Mail')
const jwt = require("jsonwebtoken");
const { success, failed, loginSuccess } = require('../helpers/response')
const env = require('../helpers/env')

const user = {
    register: async (req, res) => {
        const data = req.body
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const generate = await bcrypt.hash(password, salt)
        const img = "404P.png"
        userModel.register(data, generate, img)
            .then(async (result) => {
                const email = data.email
                success(res, [], 'Please check your email to activation')
                const token = await jwt.sign({ email: data.email }, env.SECRETKEY)
                sendMail(email, token)
            }).catch((err) => {
                if (err.message = 'Duplicate entry') {
                    failed(res, [], 'User Already Exist')
                } else {
                    failed(res, [], err.message)
                }
            })
    },
    login: (req, res) => {
        const body = req.body
        userModel.login(body)
            .then(async (result) => {
                if (!result[0]) {
                    failed(res, [], "Email invalid")
                } else {
                    const data = result[0]
                    const pass = data.password
                    const password = req.body.password
                    const isMatch = await bcrypt.compare(password, pass)
                    if (data.status === 0) {
                        failed(res, [], "Please check your email to activation")
                    } else {
                        if (!isMatch) {
                            failed(res, [], "Password invalid")
                        } else {
                            const id = result[0].id_user
                            const token_user = result[0].refress
                            const token = jwt.sign({ id: id }, env.SECRETKEY, { expiresIn: 3600 })
                            const refresh = jwt.sign({ id: id }, env.SECRETKEY)
                            if (!token_user) {
                                userModel.loginToken(refresh, id)
                                    .then((result) => {
                                        loginSuccess(res, id, token, refresh, 'success login')
                                    })
                            } else {
                                loginSuccess(res, id, token, token_user, 'success login')
                            }
                        }
                    }
                }
            }).catch((err) => {
                failed(res, [], err.message)
            })
    },
    verify: (req, res) => {
        const token = req.params.token
        jwt.verify(token, env.SECRETKEY, (err, decode) => {
            if (err) {
                res.render('404')
            } else {
                const data = jwt.decode(token)
                const email = data.email
                userModel.update(email).then((result) => {
                    res.render('index', { email })
                }).catch(err => {
                    res.render('404')
                })
            }
        })
    }
}

module.exports = user