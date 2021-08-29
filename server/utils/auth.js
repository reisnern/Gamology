const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const expiration = '2h'

module.exports = {
  authMiddleware: function ({ req }) {
    const token = req.body.token || req.query.token || req.headers.authorization

    console.log('Token: ', token)

    if (!token) {
      return req
    }

    try {
      const { data } = jwt.verify(token, secret, { algorithm: 'HS256', maxAge: expiration })

      req.user = data
    } catch {
      console.log('Invalid Token!')
    }

    return req
  },
  signToken: function ({ username, email, id }) {
    const payload = { username, email, id }

    return jwt.sign(
      { data: payload },
      secret,
      { algorithm: 'HS256', expiresIn: expiration }
    )
  }
}
