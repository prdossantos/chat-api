import { gql } from "apollo-server";

export const MessageTypeDefs = gql`
  type Message {
    _id: String
    message: String
    userId: String
    createdAt: String
    user: User
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    createMessage(userId: String, message: String): Message
  }
`;