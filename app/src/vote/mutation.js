const vote_post = async (parent, args, context) => {
  const { userId } = context
  const voteRes = await context.prisma.vote.findUnique({
    where: {
      postUserIdentifier: {
        postId: Number(args.postId),
        userId: userId,
      },
    },
  })

  if (Boolean(voteRes)) {
    throw new Error(`Already voted for post: ${args.postId}`)
  }

  const vote = await context.prisma.vote.create({
    data: {
      post: { connect: { id: Number(args.postId) } },
      user: { connect: { id: userId } },
    },
  })

  return vote
}

const vote_comment = async (parent, args, context) => {
  const { userId } = context
  const voteRes = await context.prisma.vote.findUnique({
    where: {
      commentUserIdentifier: {
        commentId: Number(args.commentId),
        userId: userId,
      },
    },
  })

  if (Boolean(voteRes)) {
    throw new Error(`Already voted for comment: ${args.postId}`)
  }

  const vote = await context.prisma.vote.create({
    data: {
      comment: { connect: { id: Number(args.commentId) } },
      user: { connect: { id: userId } },
    },
  })

  return vote
}

export { vote_post, vote_comment }
