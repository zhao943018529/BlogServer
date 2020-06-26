import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
  Ctx,
} from 'type-graphql';
import { mongoose } from '@typegoose/typegoose';
import { User, UserModel } from '../models/User';
import { RoleModel } from '../models/Role';
import { AddUserInput, BaseResponse } from './types/InputTypes';
// import { Context } from 'src/typings';
import { GraphQLContext } from '../typings';

@ObjectType()
class UserResponse {
  @Field()
  code: Number;

  @Field()
  success: Boolean;

  @Field()
  message: String;

  @Field((type) => User)
  data: User;
}

@ObjectType()
class UsersResponse extends BaseResponse {
  @Field((type) => [User])
  data: User[];
}

@Resolver((of) => User)
export default class UserResolver {
  @Query((returns) => UserResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ) {
    const user = await UserModel.findOne({ username, password });

    return {
      code: 200,
      success: true,
      data: user,
    };
  }

  @Query((returns) => User, { nullable: true })
  async getUser(@Arg('id') id: String) {
    const user = await UserModel.findOne({ _id: id });

    return user;
  }

  @Query((returns) => User)
  async getUserInfo(@Ctx() ctx: GraphQLContext) {
    if (ctx.user != null) {
      const user = await UserModel.findOne({ _id: ctx.user.id });

      return user;
    }
    ctx.ctx.status = 401;
    return null;
  }

  @Mutation((returns) => UserResponse)
  async addUser(@Arg('user') userInput: AddUserInput) {
    const general = await RoleModel.findOne({ title: 'General' });
    const ins = new UserModel({ ...userInput, roles: [general] });
    const user = await ins.save();

    return {
      code: 200,
      success: true,
      message: 'tt',
      data: user,
    };
  }

  @Query((returns) => UsersResponse)
  async getUsers(@Ctx('user') user: User) {
    const users = await UserModel.find({});

    return {
      code: 200,
      message: 'successfully',
      success: true,
      data: users,
    };
  }

  @Mutation((returns) => BaseResponse)
  async grantUsers(
    @Arg('users', () => [String]) users: string[],
    @Arg('roles', () => [String]) roles: string[],
    @Ctx('user') user: User
  ) {
    const result = await UserModel.updateMany(
      { _id: { $in: users } },
      { roles: roles.map((role) => new mongoose.Types.ObjectId(role)) }
    );

    return {
      code: 200,
      message: 'successfully',
      success: true,
    };
  }
}
