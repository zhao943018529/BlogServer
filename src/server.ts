import Koa from 'koa';
import serve from 'koa-static';
import { ApolloServer } from 'apollo-server-koa';
import { graphqlUploadKoa } from 'graphql-upload';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import './db/index';
import UserResolver from './resolvers/UserResolver';
import FileResolver from './resolvers/FileResolver';
import File from './models/File';

const schema = buildSchema({
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
  app
    .use(serve('../upload', { root: '/upload' }))
    .use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }));
  server.applyMiddleware({ app });

  app.use(async (ctx) => {
    ctx.body = 'Hello,world!!!';
  });

  app.listen(13892, () => {
    console.log('koa has started!!!');
  });
});
