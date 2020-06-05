import Koa from 'koa';
import serve from 'koa-static';
import { ApolloServer } from 'apollo-server-koa';
import { graphqlUploadKoa } from 'graphql-upload';
import { buildSchema } from 'type-graphql';
import bodyParser from 'koa-bodyparser';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import Path from 'path';
import './db/index';
import UserResolver from './resolvers/UserResolver';
import FileResolver from './resolvers/FileResolver';
import UserMiddleware from './middlewares/user';
import UserRouter from './routes/user';
import { secret } from './env';
// import File from './models/File';

buildSchema({
  resolvers: [UserResolver, FileResolver],
}).then((schema) => {
  const server = new ApolloServer({
    schema,
    playground: true,
    // typeDefs: gql`
    //   type File {
    //     filename: String!
    //     mimetype: String!
    //     encoding: String!
    //   }

    //   type Query {
    //     uploads: [File]
    //   }

    //   type MutationResponse {
    //     code: String!
    //     success: Boolean!
    //     message: String!
    //     data: String
    //   }

    //   type Mutation {
    //     uploadImage(file: Upload!): MutationResponse!
    //   }
    // `,
    // resolvers: {
    //   Query: {
    //     uploads: (parent, args) => {},
    //   },
    //   Mutation: {
    //     uploadImage: (parent, args) => {
    //       return args.file.then((file: File) => {
    //         //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
    //         //file.createReadStream() is a readable node stream that contains the contents of the uploaded file
    //         //node stream api: https://nodejs.org/api/stream.html
    //         return {
    //           code: 200,
    //           success: true,
    //           message: "adfasf",
    //           data: "qwereqwr",
    //         };
    //       });
    //     },
    //   },
    // },
    uploads: false,
    context: ({ ctx }) => {
      return { ctx, user: ctx.req.user, test: '12345678' };
    },
    // {
    //   // Limits here should be stricter than config for surrounding
    //   // infrastructure such as Nginx so errors can be handled elegantly by
    //   // graphql-upload:
    //   // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    //   maxFileSize: 10000000, // 10 MB
    //   maxFiles: 10,
    // },
  });
  const app = new Koa();
  app.context.secret = secret;
  // console.log(Path.resolve(__dirname, '../upload'));
  app.use(bodyParser());
  app.use(
    jwt({
      secret: secret,
      passthrough: true,
      getToken: (ctx, bb) => {
        return 'aaa';
      },
      // isRevoked: (ctx, a, b) => {
      //   console.log(ctx);
      //   return Promise.resolve(true);
      // },
    }).unless({
      path: [/^\/login/, /^\/test/],
    })
  );
  app
    .use(serve(Path.resolve(__dirname, '../upload')))
    .use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use(UserMiddleware);
  app.use(UserRouter.routes());
  server.applyMiddleware({ app });
  app.use((ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message,
        };
      } else {
        throw err;
      }
    });
  });

  // app.use(async (ctx) => {
  //   ctx.body = 'Hello,world!!!';
  // });

  app.listen(13892, () => {
    console.log('koa has started!!!');
  });
});
