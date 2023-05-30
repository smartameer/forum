const comments = async (parent, args, context) => {
  const result = await context.prisma.comment.findMany({
    where: {
      postId: Number(args.post_id),
    },
  })
  return result
}

const comment = async (parent, args, context) => {
  const result = await context.prisma.comment.findUnique({
    where: {
      id: Number(args.id),
    },
  })
  return result
}

export { comments, comment }
