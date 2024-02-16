import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { NextRequest } from 'next/server';
import {
  getAnimalInsecure,
  getAnimalsInsecure,
} from '../../../database/animals';
import { Resolvers } from '../../../graphql/graphqlGeneratedTypes';

const typeDefs = gql`
  type Animal {
    id: ID!
    firstName: String!
    type: String!
    accessory: String
  }

  type Query {
    animals: [Animal]
    animal(id: ID!): Animal
  }
`;

const resolvers: Resolvers = {
  Query: {
    animals: async () => {
      return await getAnimalsInsecure();
    },

    animal: async (parent, args) => {
      return await getAnimalInsecure(args.id);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
});

const apolloServerRouteHandler = startServerAndCreateNextHandler(apolloServer);

export async function GET(req: NextRequest) {
  return await apolloServerRouteHandler(req);
}

export async function POST(req: NextRequest) {
  return await apolloServerRouteHandler(req);
}
