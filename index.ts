import express, { Express } from "express";
import env from "dotenv";
env.config();
import { connect } from "./config/database";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolver";
import { requireAuth } from "./middlewares/auth.middleware";

const startServer = async () => {
    connect();

    const app: Express = express();
    const port: (number | string) = `${process.env.PORT}` || 3000;

    app.use("/api/graphql", requireAuth)

    const appolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        context: ({ req }) => req
    });

    await appolloServer.start();

    appolloServer.applyMiddleware({
        app: app,
        path: "/api/graphql"
    });

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}

startServer();