import { ObjectType, Field, Arg } from "type-graphql";

@ObjectType()
export class User {
  @Field((type) => String)
  name: String;

  @Field((type) => Number)
  age: Number;
}
