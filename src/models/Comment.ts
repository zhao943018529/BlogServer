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
  author: Ref<User>;

  @Field((type) => String)
  @Property({})
  article?: string;

  @Field((type) => User)
  @Property({ ref: User })
  replyTo?: User;

  @Field((type) => String, { nullable: true })
  @Property({})
  root?: string;

  @Field((type) => Date)
  @Property({ default: Date.now() })
  createTime?: Date;
}

export const CommentModel = getModelForClass(Comment);
