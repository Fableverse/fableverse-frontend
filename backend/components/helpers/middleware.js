const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_TOKEN_SECRET

const middleware = (req, res, next) => {
  const token = req.cookies.token

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end()
  }

  let payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // Bad Token
      return res.status(401).end()
    }
    // Error
    return res.status(400).end()
  }

  // Variables to pass back to function
  req.email = payload.email // This needs to be depreciated
  res.locals.email = payload.email
  next()
}

module.exports = middleware
