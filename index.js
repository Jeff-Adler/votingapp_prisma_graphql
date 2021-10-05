const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const schema = {
  typeDefs,
  resolvers,
};

const typeDefs = `
  type User {
    id          :ID!
    name        :String!
    polls       :[Poll]
  }
  type Poll {
    id          :ID!
    description :String!
    user        :User!
    options     :[Option!]
    votes       :[Vote]
  }
  type Option {
    id          :ID!
    text        :String!
    poll        :Poll!
    votes       :[Vote]
  }
  type Vote {
    id          :ID!
    user        :User!
    poll        :Poll!
    option      :Option!
  }
  type Query {
    users: [User]
    polls: [Poll]
    votes: [Vote]
    user(id: ID!): User
    poll(id: ID!): Poll
  }
  type Mutation {
    createUser(
      name: String!
    ): User
    createPoll(
      description: String!
      id: ID!
      options: [String!]
    ): Poll
    createVote(
      userID: ID!
      pollID: ID!
      optionID: ID!
    ): Vote
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      const newUser = context.prisma.user.create({
        data: {
          name: args.name,
        },
      });
      return newUser;
    },
  },
};

const server = new GraphQLServer({
  schema,
  context: {
    prisma,
  },
});

const options = {
  port: 8000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};
server.start(options, ({ port }) => console.log(`Server started, listening on port ${port} for incoming requests.`));
