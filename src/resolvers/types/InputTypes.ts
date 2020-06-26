import { InputType, Field, ObjectType } from 'type-graphql';
import { Min } from 'class-validator';
import { Ref } from '../../models/types';
import { User } from '../../models/User';
import { Tag } from '../../models/Tag';
import { Article } from '../../models/Article';
import { min } from 'class-validator';

@InputType({ description: 'New user data' })
class AddUserInput implements Partial<User> {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  birthday: Date;

  @Field((type) => Date, { nullable: true })
  updateTime?: Date;

  @Field((type) => Date, { nullable: true })
  createTime: Date;
}

@InputType({ description: 'New tag data' })
class TagInput implements Partial<Tag> {
  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  description?: string;
}

@InputType({ description: 'New article' })
class ArticleInput implements Partial<Article> {
  @Field({ nullable: true })
  id?: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  content: string;

  @Field((type) => [String], { nullable: true })
  tags?: Ref<Tag>[];

  @Field((type) => Date, { nullable: true })
  updateTime?: Date;
}

@InputType({ description: 'Pagination' })
class Pagination {
  @Field({ defaultValue: 1 })
  @Min(1)
  page: number;

  @Field({ defaultValue: 10 })
  @Min(5)
  pageSize: number;

  @Field({ defaultValue: 'desc' })
  order: string;

  @Field({ defaultValue: 'createTime' })
  orderBy: string;
}

@ObjectType()
class BaseResponse {
  @Field()
  code: Number;

  @Field()
  success?: Boolean;

  @Field({ nullable: true })
  message?: String;
}

export { AddUserInput, TagInput, ArticleInput, Pagination, BaseResponse };
