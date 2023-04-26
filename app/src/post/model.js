const user = (parent, args, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).user()
}

const comments = (parent, args, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).comments({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

const votes = (parent, args, context) => {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).votes()
}

const totalComments = (parent, args, context) => {
  return context.prisma.comment.count({ where: { postId: parent.id } })
}

const totalVotes = async (parent, args, context) => {
  return context.prisma.vote.count({ where: { postId: parent.id } })
}

export { user, comments, votes, totalComments, totalVotes }
