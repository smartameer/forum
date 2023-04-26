const user = (parent, args, context) => {
  return context.prisma.vote.findUnique({ where: { id: parent.id } }).user()
}

export { user }
