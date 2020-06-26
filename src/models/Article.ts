import { ObjectType, Field, Arg, ID } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
  arrayProp,
  mongoose,
} from '@typegoose/typegoose';
// import { ObjectId } from 'mongodb';
import { Ref } from './types';
import { Tag } from './Tag';
import { User, UserModel } from './User';
import { Comment } from './Comment';

@ObjectType()
export class Article {
  @Field((type) => ID)
  readonly id: string;

  @Field((type) => String)
  @Property({ required: true })
  title: string;

  @Field((type) => String)
  @Property({ required: true })
  content: string;

  @Field((type) => [Tag])
  @arrayProp({ ref: Tag, refType: mongoose.Schema.Types.ObjectId })
  tags: Ref<Tag>[];

  @Field((type) => User)
  @Property({
    ref: User,
    required: true,
    refType: mongoose.Schema.Types.ObjectId,
  })
  author: Ref<User>;

  @Field((type) => Date)
  @Property({ default: Date.now })
  createTime: Date;

  @Field((type) => Date)
  @Property({ default: Date.now })
  updateTime: Date;
}

export const ArticleModel = getModelForClass(Article);
