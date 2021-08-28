import { gql } from "apollo-server";

export const UserTypeDefs = gql`
type User {
  _id: String
  name: String
}
type Query {
  users: [User],
}
type Mutation {
  signIn(_id: String, name: String): User,
}
`;