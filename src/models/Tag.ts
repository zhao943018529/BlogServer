import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
// import { ObjectId } from 'mongodb';

@ObjectType()
export class Tag {
  @Field((type) => ID)
  readonly id: String;

  @Field((type) => String)
  @Property({ required: true })
  title: String;

  @Field((type) => String, { nullable: true })
  @Property({ maxlength: 120 })
  description?: String;
}

export const TagModel = getModelForClass(Tag);
