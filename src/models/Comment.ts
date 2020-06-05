import { ObjectType, Field, Arg, ID } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
  arrayProp,
} from '@typegoose/typegoose';
// import { ObjectId } from 'mongodb';
import { Ref } from './types';
import { User } from './User';

@ObjectType()
export class Comment {
  @Field((type) => ID)
  readonly id: String;

  @Field()
  @Property({ required: true })
  content: String;

  @Field((type) => User)
  @Property({ required: true })
  user: Ref<User>;

  @Field((type) => Comment, { nullable: true })
  @Property({ ref: this })
  parent?: this;

  @Field((type) => Date)
  @Property({ required: true })
  createTime: Date;
}

export const CommentModel = getModelForClass(Comment);
