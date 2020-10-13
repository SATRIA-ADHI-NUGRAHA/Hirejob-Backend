const chatModel = require('../models/chat')
const { success, failed } =require('../helpers/response')


const Chat = {
  addFriends: (req, res) => {
    const data = req.body
    chatModel.addFriends(data)
        .then((result) => {
            success(res, result, 'Success insert friends')
        }).catch((err) => {
            failed(res, [], err.message)
        })
  },
  getFriends: (req, res) => {
      const id = req.params.id
      chatModel.getFriends(id)
          .then((result) => {
              success(res, result, 'Success List friends')
          }).catch((err) => {
              failed(res, [], err.message)
          })
  }
}

module.exports = Chat