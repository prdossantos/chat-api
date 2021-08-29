import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./src/routes";
import mdbConnection from "./src/mongo.connection";
import { logger, responseError } from "./src/helper";
import { ApolloServer, gql } from "apollo-server";
import typeDefs from "./src/typeDefs";
import resolvers from "./src/resolvers";
const pino = require("pino-http")();

require("dotenv").config({
    path: ".env",
})

const port = process.env.NODE_PORT || "8080";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(pino);
app.use(cors());

app.listen(port, () => {
    logger.info(`app listening on port ${port}`);

    mdbConnection().then(( connection ) => {
        logger.info("MongoDB connected");
    }).catch( ( e ) => {
        logger.error(`Mongodb connection error: ${e.message}`);
    })
})

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    logger.info(`🚀 Server graphql ready at ${url}`);
});

//Routes
app.use("/", routes);

//Response Middleware
app.use((req, res, next) => {
    if (res.statusCode >= 400) {
        res.status(res.statusCode).send(responseError(res.statusMessage || "Method not found"));
    } else {
        res.status(404).send(responseError(res.statusMessage || "Method not found"));
    }
});