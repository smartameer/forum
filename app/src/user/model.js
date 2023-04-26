const posts = (parent, args, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).posts()
}

const comments = (parent, args, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).comments()
}

const votes = (parent, args, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).votes()
}

const totalPosts = (parent, args, context) => {
  return context.prisma.post.count({ where: { userId: parent.id } })
}

const totalComments = (parent, args, context) => {
  return context.prisma.comment.count({ where: { userId: parent.id } })
}

const totalVotes = (parent, args, context) => {
  return context.prisma.vote.count({ where: { userId: parent.id } })
}

export { posts, comments, votes, totalPosts, totalComments, totalVotes }
