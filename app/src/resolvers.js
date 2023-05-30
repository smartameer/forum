import { InfoQuery } from './info/index.js'
import { User, UserMutation, UserQuery } from './user/index.js'
import { Post, PostQuery, PostMutation } from './post/index.js'
import { Comment, CommentMutation, CommentQuery } from './comment/index.js'
import { Vote, VoteMutation } from './vote/index.js'

export const resolvers = {
  Query: {
    ...InfoQuery,
    ...PostQuery,
    ...UserQuery,
    ...CommentQuery,
  },
  Mutation: {
    ...UserMutation,
    ...PostMutation,
    ...CommentMutation,
    ...VoteMutation,
  },
  User,
  Post,
  Comment,
  Vote,
}
