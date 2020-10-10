const bcrypt = require('bcrypt')

const user = {
    register: async (req, res) => {
        const data = req.body
        const pass = req.body.password
        const salt = await bcrypt.genSalt(10)
        const generate = await bcrypt.hash(pass, salt)
        console.log(data);
    }
}

module.exports = user