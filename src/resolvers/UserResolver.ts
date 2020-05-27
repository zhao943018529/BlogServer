import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
} from 'type-graphql';
import { User, UserModel } from '../models/User';
import { AddUserInput } from './types/InputTypes';

@ObjectType()
class UserResponse {
  @Field()
  code: Number;

  @Field()
  success: Boolean;

  @Field()
  message: String;

  @Field()
  data: User;
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

  @Mutation((returns) => UserResponse)
  async addUser(@Arg('user') userInput: AddUserInput) {
    const ins = new UserModel(userInput);
    const user = await ins.save();

    return {
      code: 200,
      success: true,
      message: 'tt',
      data: user,
    };
  }
}
