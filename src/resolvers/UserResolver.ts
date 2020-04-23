import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User, UserModel } from "../models/User";
import { AddUserInput } from "./types/InputTypes";

@Resolver((of) => User)
export default class UserResolver {
  @Query((returns) => User)
  async getUser(@Arg("id") id: String) {
    const user = await UserModel.findOne({ id });

    return user;
  }

  @Mutation((returns) => User)
  async saveUser(@Arg("user") userInput: AddUserInput) {
    const ins = new UserModel(userInput);
    return await ins.save();
  }
}
