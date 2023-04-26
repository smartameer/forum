const create_comment = async (parent, args, context) => {
  const { userId } = context
  const comment = await context.prisma.comment.create({
    data: {
      message: args.message,
      user: { connect: { id: userId } },
      post: { connect: { id: parseInt(args.postId) } },
    },
  })

  return comment
}

const update_comment = async (parent, args, context) => {
  const { userId } = context
  const commentDetails = await context.prisma.comment.findUnique({
    where: { id: Number(args.id) },
  })

  if (commentDetails.userId !== userId) {
    throw new Error('You are not the author')
  }

  const comment = await context.prisma.comment.update({
    where: {
      id: parseInt(args.id),
    },
    data: {
      message: args.message,
      updatedAt: new Date(),
    },
  })

  return comment
}

const delete_comment = async (parent, args, context) => {
  const { userId } = context
  const commentDetails = await context.prisma.comment.findUnique({
    where: { id: Number(args.id) },
  })

  if (commentDetails.userId !== userId) {
    throw new Error('You are not the author')
  }

  await context.prisma.comment.delete({
    where: {
      id: parseInt(args.id),
    },
  })

  return true
}

export { create_comment, update_comment, delete_comment }
