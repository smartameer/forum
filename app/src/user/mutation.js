import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { APP_SECRET, TOKEN_EXPIRY } from '../utils.js'

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })
  const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: TOKEN_EXPIRY })

  return {
    token,
    user,
  }
}

const login = async (parent, args, context) => {
  const user = await context.prisma.user.findUnique({ where: { username: args.username } })

  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)

  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: TOKEN_EXPIRY })

  return {
    token,
    user,
  }
}

const update_account = async (parent, args, context) => {
  const { userId } = context
  const data = {}

  if (args.name) {
    data.name = args.name
  }
  if (args.password) {
    data.password = await bcrypt.hash(args.password, 10)
  }

  const user = await context.prisma.user.update({
    where: {
      id: userId,
    },
    data,
  })

  return user
}

export { signup, login, update_account }
