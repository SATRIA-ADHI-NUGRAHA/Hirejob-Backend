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
  },
    addChat: (req, res) => {
        const body = req.body
        console.log(body);
    }
}

module.exports = Chat