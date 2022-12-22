import { gql, ApolloServer } from "apollo-server-micro";
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
    type User {
        id: ID,
    }

    type Query {
        getUser: User,
    }
`;

const resolvers = {
    Query: {
        getUser: () => {
            return {
                id: "Foo"
            };
        },
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],

});

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};