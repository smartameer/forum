const users = async (parent, args, context) => {
  const result = await context.prisma.user.findMany({
    skip: Number(args.page) * Number(args.limit || 10) || 0,
    take: args.limit || 10,
  })

  if (args.total) {
    const total = await context.prisma.user.count()

    return {
      result,
      total,
    }
  }
  return { total: -1, result }
}

const me = async (parent, args, context) => {
  const { userId } = context
  const result = await context.prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  return result
}

export { users, me }
