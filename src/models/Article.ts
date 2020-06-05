import { ObjectType, Field, Arg, ID } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
  arrayProp,
} from '@typegoose/typegoose';
// import { ObjectId } from 'mongodb';
import { Ref } from './types';
import { Tag } from './Tag';
import { User, UserModel } from './User';
import { Comment } from './Comment';

@ObjectType()
export class Article {
  @Field((type) => ID)
  readonly id: String;

  @Field((type) => String)
  @Property({ required: true })
  title: String;

  @Field((type) => String)
  @Property({ required: true })
  content: String;

  @Field((type) => [Tag])
  @arrayProp({ items: Tag })
  tags: Ref<Tag>[];

  @Field((type) => User)
  @Property({ ref: User, required: true })
  author: Ref<User>;

  @Field((type) => Comment, { nullable: true })
  @Property({ ref: Comment })
  comment?: Ref<Comment>;

  @Field((type) => Date)
  @Property({})
  createTime: Date;

  @Field((type) => Date)
  @Property({})
  updateTime: Date;
}

export const ArticleModel = getModelForClass(Article);
