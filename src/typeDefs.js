import gql from 'graphql-tag'

const typeDefs = gql`
  type Message {
    id: Int
    message: String
  }

  type Query {
    MessageList: [Message]
  }

  type Mutation {
    MessageAdd(message: String!): [Message]
  }
`

export default typeDefs
