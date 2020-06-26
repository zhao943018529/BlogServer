/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Field,
  ObjectType,
  Query,
} from 'type-graphql';
import { User } from '../models/User';
import { Tag, TagModel } from '../models/Tag';
import { TagInput } from './types/InputTypes';
import { ObjectId } from 'mongodb';

@ObjectType()
class TagResponse {
  @Field()
  code: Number;

  @Field()
  success?: Boolean;

  @Field({ nullable: true })
  message?: String;

  @Field()
  data: Tag;
}

@Resolver(Tag)
export default class TagResolver {
  @Mutation((returns) => TagResponse)
  async saveTag(@Arg('tag') tag: TagInput, @Ctx('user') user: User) {
    const tagModel = new TagModel(tag);
    tagModel.createBy = new ObjectId(user.id);
    const tagObj = await tagModel.save();

    return {
      code: 200,
      success: true,
      message: 'add tag successfully',
      data: tagObj,
    };
  }

  @Mutation((returns) => TagResponse)
  async deleteTag(@Arg('id') id: string) {
    const tag = await TagModel.deleteOne({ _id: id });

    return {
      code: 200,
      success: true,
      message: 'delete tag successfully!!!',
    };
  }

  @Query((returns) => [Tag])
  async tags() {
    const tags = await TagModel.find({});

    return tags;
  }
}
