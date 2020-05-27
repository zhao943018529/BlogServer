import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class File {
  @Field()
  filename: String;

  @Field()
  mimetype: String;

  @Field()
  encoding: String;
}
