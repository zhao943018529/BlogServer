/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Field,
  ObjectType,
  Query,
  Int,
  Authorized,
} from 'type-graphql';
import { User } from '../models/User';
import { Article, ArticleModel } from '../models/Article';
import { Tag, TagModel } from '../models/Tag';
import { ArticleInput, Pagination, BaseResponse } from './types/InputTypes';
import { ObjectId } from 'mongodb';

@ObjectType()
class ArticleResponse {
  @Field()
  code: Number;

  @Field()
  success?: Boolean;

  @Field({ nullable: true })
  message?: String;

  @Field()
  data: Article;
}

@ObjectType()
class AritcleList {
  @Field((type) => [Article])
  articles: Article[];

  @Field()
  count: number;
}

@Resolver(Article)
export default class ArticleResolver {
  @Mutation((returns) => ArticleResponse)
  async addArticle(
    @Arg('article') article: ArticleInput,
    @Ctx('user') user: User
  ) {
    const model = new ArticleModel({
      ...article,
      author: user.id,
    });
    const result = await model.save();

    return {
      code: 200,
      success: true,
      message: 'save article successfully',
      data: result,
    };
  }

  @Query((returns) => AritcleList)
  async getUserArticles(
    @Arg('pageInfo') { page, pageSize, order, orderBy }: Pagination,
    @Ctx('user') user: User
  ) {
    const result = await ArticleModel.find({ author: user.id })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort(`${order === 'asc' ? '' : '-'}${orderBy}`)
      .select('_id title createTime')
      .populate('tags', '_id title')
      .populate('author', 'username');

    const count = await ArticleModel.where('author', user.id).count();

    return {
      articles: result,
      count,
    };
  }

  /** 获取所有文章数量 */
  @Query((returns) => Int)
  async getArticleCount() {
    const count = await ArticleModel.find({}).count();

    return count;
  }

  @Query((returns) => AritcleList)
  async getMoreArticles(
    @Arg('offset', () => Int) offset: number,
    @Ctx('user') user: User
  ) {
    const articles = await ArticleModel.find({})
      .limit(10)
      .skip(offset)
      .sort('-createTime')
      .select('_id title createTime')
      .populate('tags', '_id title')
      .populate('author', 'username');

    return {
      articles,
      count: this.getArticleCount(),
    };
  }

  @Mutation((returns) => BaseResponse)
  async deleteArticles(@Arg('ids') ids: string) {
    const idArr = ids.split(',');
    const result = await ArticleModel.deleteMany({ _id: { $in: idArr } });

    return {
      code: 200,
      success: true,
      message: 'delete article successfully!!!',
    };
  }

  @Mutation((returns) => BaseResponse)
  async deleteArticle(@Arg('id') id: string) {
    const result = await ArticleModel.deleteOne({ _id: id });
    return {
      code: 200,
      success: true,
      message: 'delete article successfully!!!',
    };
  }

  @Mutation((returns) => ArticleResponse)
  async updateArticle(
    @Arg('article') article: ArticleInput,
    @Ctx('user') user: User
  ) {
    const result = await ArticleModel.findByIdAndUpdate(article.id, {
      ...article,
    });

    return {
      code: 200,
      success: true,
      message: 'save article successfully',
      data: result,
    };
  }

  @Query((returns) => Article)
  async getArticle(@Arg('id') id: string, @Ctx('user') user: User) {
    const result = await ArticleModel.findById(id)
      .select('_id title content updateTime createTime')
      .populate('tags', '_id title')
      .populate('author', '_id username firstName lastName phone');

    return result;
  }
}
