import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    all_posts: [Post!]!
    get_post_by_id(id: ID!): Post!
  }

  extend type Mutation {
    createPost(NewPost: PostInput): Post! @isAuth
    updatePostByID(UpdatePost: PostInput, id: ID!): Post! @isAuth
    deletePostByID(id: ID!): Message! @isAuth
  }

  input PostInput {
    title: String!
    content: String!
    featureImg: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    featureImg: String
    author: String
    createdAt: String
    updatedAt: String
  }
  type Message {
    id: ID!
    message: String!
    success: Boolean
  }
`;
