import jwt from 'jsonwebtoken'

const APP_SECRET = process.env.JWT_SECRET || 'forum'
const TOKEN_EXPIRY = 24 * 60 * 60

const getTokenPayload = token => {
  return jwt.verify(token, APP_SECRET)
}

const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')

      if (!token) {
        throw new Error('No token found')
      }
      const { userId } = getTokenPayload(token)

      return userId
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken)

    return userId
  }

  throw new Error('Not authenticated')
}

export { APP_SECRET, TOKEN_EXPIRY, getUserId }
