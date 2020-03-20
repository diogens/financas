const { GraphQLServer } = require("graphql-yoga");
const Binding = require("prisma-binding");
const { prisma } = require("./generated/prisma-client");

const binding = new Binding.Prisma({
  typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
  endpoint: process.env.PRISMA_ENDPOINT
})

const resolvers = {
  Query: {
    user(parent, args, context, info) {
     /*  return prisma.user({ id: args.id })
        .then(user => {
          console.log('User:', user)
          return user
        }).catch(
          console.log('O usuario ', args.id, ', não existe')
        ) */

        return binding.query.user({where: {id: args.id}}, info)
          .then(user => {
            console.log('User:', user)
            return user
          })
          .catch(err=>console.error('erro=>', err))
      
      /* return {
        id: "01",
        name: "teste"
      }; */
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
