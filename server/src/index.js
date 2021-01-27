import express from "express";
import { PORT } from "./config";
import { success } from "consola";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import bodyparser from "body-parser";
import connect_DB from "./db";
import cors from "cors";
import { join } from "path";
import * as AppModels from "./models/";
import AuthMiddleware from "./middlewares/auth";
import { schemaDirectives } from "./graphql/directives";
const port = PORT;
const app = express();
app.use(cors());
app.use(bodyparser.json({ limit: "20mb" }));
console.log(join(__dirname, "..", "uploads"));
app.use(AuthMiddleware);
app.use("/uploads", express.static(join(__dirname, "..", "uploads")));
const startApp = () => {
  connect_DB();
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    schemaDirectives,
    context: ({ req }) => {
      let { isAuth, user } = req;
      return {
        req,
        user,
        isAuth,
        ...AppModels,
      };
    },
  });
  server.applyMiddleware({ app });
  app.listen(port, () => {
    success({
      message: `Server is running at port ${port}`,
      badge: true,
    });
  });
};

startApp();
