import { ObjectType, Field, Arg } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@ObjectType()
export class User {
  @Field()
  @Property()
  readonly _id: String;

  @Field((type) => String)
  @Property({ required: true })
  name: String;

  @Field((type) => Number)
  @Property({ max: 100, min: 0, default: 0 })
  age: Number;

  @Field((type) => String, { nullable: true })
  @Property({ default: "" })
  description?: String;
}

export const UserModel = getModelForClass(User);
