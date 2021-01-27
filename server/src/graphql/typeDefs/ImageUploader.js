import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    Info: String!
  }
  extend type Mutation {
    UploadFile(file: Upload!): String!
  }
`;
