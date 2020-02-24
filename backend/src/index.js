const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    user(parent, args, context, info) {
      return prisma.user({ id: args.id });
    }
  }
  //Resolves
  /*  User: {
    id(parent, args, context, info) {
      console.log("ID =>", parent.id);
      return parent.id;
    },
    name(_, args, context, info) {
      console.log("NAME =>", _.name);
      return _.name;
    }
  } */
};

const server = new GraphQLServer({
  typeDefs: `${__dirname}/schema.graphql`,
  resolvers
});

server
  .start()
  .then(() => console.log("Server running on http://localhost:4466"));
