import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import "./db/index";
import UserResolver from "./resolvers/UserResolver";

const schema = buildSchema({
  resolvers: [UserResolver],
}).then((schema) => {
  const server = new ApolloServer({
    schema,
    playground: true,
  });
  const app = new Koa();
  server.applyMiddleware({ app });

  app.use(async (ctx) => {
    ctx.body = "Hello,world!!!";
  });

  app.listen(8080, () => {
    console.log("koa has started!!!");
  });
});
