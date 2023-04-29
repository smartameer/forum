const posts = async (parent, args, context) => {
  const PostOrder = {
    popular: 'popular',
    recent: 'recent',
    discussed: 'discussed',
  }

  let orderBy = {
    updatedAt: 'desc',
  }

  if (args.sort) {
    const key = Object.keys(args.sort)[0]
    const order = Object.values(args.sort)[0]

    switch (key) {
      case PostOrder.popular:
        orderBy = {
          votes: {
            _count: order,
          },
        }
        break
      case PostOrder.discussed:
        orderBy = {
          comments: {
            _count: order,
          },
        }
        break
      case PostOrder.recent:
      default:
        orderBy.updatedAt = order
        break
    }
  }

  const result = await context.prisma.post.findMany({
    skip: Number(args.page) * Number(args.limit || 10) || 0,
    take: args.limit || 10,
    orderBy,
  })

  if (args.total) {
    const total = await context.prisma.post.count()

    return {
      result,
      total,
    }
  }

  return {
    result,
    total: -1,
  }
}

const post = async (parent, args, context) => {
  const result = await context.prisma.post.findUnique({
    where: {
      id: Number(args.id),
    },
    include: {
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
  return result
}

export { posts, post }
