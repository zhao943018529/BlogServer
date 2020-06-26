import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { User } from '../models/User';
import { Ref } from './types';
// import { ObjectId } from 'mongodb';

@ObjectType()
export class Tag {
  @Field((type) => ID)
  readonly id: String;

  @Field((type) => String)
  @Property({ required: true, unique: true })
  title: String;

  @Field((type) => String, { nullable: true })
  @Property({ maxlength: 120 })
  description?: String;

  @Field((type) => User)
  @Property({ ref: User })
  createBy: Ref<User>;

  @Field((type) => Date)
  @Property()
  createDate: Date;
}

export const TagModel = getModelForClass(Tag);
