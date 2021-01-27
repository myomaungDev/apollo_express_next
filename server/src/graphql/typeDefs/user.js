import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    get_all_users: [User!]!
    get_user_by_id(id: ID!): User!
    authenticated_Profile: User! @isAuth
  }
  extend type Mutation {
    createUser(NewUser: UserInput!): UserMessage!
    updateUser(UpdateUser: UserUpdateInput!): User! @isAuth
    loginUser(LoginUser: LoginUser!): UserMessage!
    deleteUser(id: ID!): UserMessage! @isAuth
  }
  input LoginUser {
    email: String!
    password: String!
  }
  input UserUpdateInput {
    username: String!
    firstname: String!
    lastname: String!
    avatarImg: String
  }
  input UserInput {
    username: String!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
    avatarImg: String
    updatedAt: String
    createdAt: String
  }
  type User {
    id: ID
    username: String!
    email: String!
    password: String!
    firstname: String!
    lastname: String!
    avatarImg: String
    updatedAt: String
    createdAt: String
  }
  type UserMessage {
    user: User
    success: Boolean!
    id: ID!
    message: String!
    access_token: String
  }
`;
