import { User } from "../../models/User";
import { InputType, Field } from "type-graphql";

@InputType({ description: "New user data" })
export class AddUserInput implements Partial<User> {
  @Field()
  name: String;

  @Field()
  age: Number;

  @Field({ nullable: true })
  description?: String;
}
