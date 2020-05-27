import {
  Resolver,
  // Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
  InputType,
} from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import MyFile from '../models/File';
import { ReadStream } from 'fs';
import File from '../models/File';
import upload from '../utils/file';

@ObjectType()
class FileResponse {
  @Field()
  code: Number;
  @Field()
  success: Boolean;
  @Field()
  message: String;
  @Field()
  data: String;
}

// @InputType()
// class FileUpload {
//   @Field()
//   filename: string;

//   @Field()
//   mimetype: string;

//   @Field()
//   encoding: string;

//   @Field()
//   createReadStream: Function;
// }

@Resolver(MyFile)
export default class FileResolver {
  @Mutation(() => FileResponse)
  async uploadImage(@Arg('file', (type) => GraphQLUpload) file: FileUpload) {
    const result = await upload(file);

    return {
      code: 200,
      success: true,
      data: result.path,
    };
  }
}
