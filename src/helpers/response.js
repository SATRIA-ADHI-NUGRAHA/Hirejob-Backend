const response = {
  success: (res, data, message) => {
    const result = {
      success: true,
      code: 200,
      status: 'OK',
      message,
      data
    }
    res.status(200).json(result)
  },
  failed: (res, data, message) => {
    const failed = {
      success: false,
      code: 500,
      status: 'Error',
      message,
      data
    }
    res.json(failed)
  },
  successWithMeta: (res, data, meta, message) => {
    const result = {
      message,
      success: true,
      code: 111,
      meta: meta,
      data: data
    }
    res.json(result)
  },
  errorImage: (res, data, message) => {
    const error = {
      success: false,
      code: 400,
      status: 'Bad Request',
      message,
      data
    }
    res.status(400).json(error)
  },
  loginSuccess: (res, id, role, token, refreshToken, message) => {
    const result = {
      code: 200,
      status: true,
      message: message,
      data: {
        id,
        role,
        token,
        refreshToken
      }
    }
    res.json(result)
  },
  tokenExpired: (res, data, message) => {
    const result = {
      message,
      success: false,
      code: 405,
      data
    }
    res.status(405).json(result)
  },
  tokenErr: (res, data, message) => {
    const result = {
      message,
      success: false,
      code: 505,
      data
    }
    res.status(505).json(result)
  },
  tokenStatus: (res, data, message) => {
    const result = {
      message,
      success: true,
      code: 200,
      data
    }
    res.json(result)
  }
}

module.exports = response