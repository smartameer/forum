const create_post = async (parent, args, context) => {
  const { userId } = context
  const post = await context.prisma.post.create({
    data: {
      title: args.title,
      description: args.description,
      user: { connect: { id: userId } },
    },
  })

  return post
}

const update_post = async (parent, args, context) => {
  const { userId } = context
  let data = {}
  const postDetails = await context.prisma.post.findUnique({
    where: { id: Number(args.id) },
  })

  if (postDetails.userId !== userId) {
    throw new Error('You are not the author')
  }

  if (args.title) {
    data.title = args.title
  }
  if (args.description) {
    data.description = args.description
  }

  const post = await context.prisma.post.update({
    where: {
      id: Number(args.id),
    },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })

  return post
}

const delete_post = async (parent, args, context) => {
  const { userId } = context
  const postDetails = await context.prisma.post.findUnique({
    where: { id: Number(args.id) },
  })

  if (postDetails.userId !== userId) {
    throw new Error('You are not the author')
  }

  await context.prisma.post.delete({
    where: {
      id: Number(args.id),
    },
  })

  return true
}

export { create_post, update_post, delete_post }
