const user = (parent, args, context) => {
  return context.prisma.comment.findUnique({ where: { id: parent.id } }).user()
}

const votes = (parent, args, context) => {
  return context.prisma.comment.findUnique({ where: { id: parent.id } }).votes()
}

const totalVotes = async (parent, args, context) => {
  return context.prisma.votes.count({ where: { commentId: parent.id } })
}

export { user, votes, totalVotes }
