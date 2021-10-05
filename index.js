const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');

const schema = {
  typeDefs,
  resolvers,
};

const typeDefs = `
type Query {
  hello(name: String): String!
}
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
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
