import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../models/User";

@Resolver((of) => User)
export default class UserResolver {
  @Query((returns) => User)
  async getUser(@Arg("id") id: String) {
    const result = await new Promise(function (fullfill, reject) {
      setTimeout(() => fullfill({ id: 111, name: "aaa", age: 12 }), 1000);
    });

    return result;
  }
}
