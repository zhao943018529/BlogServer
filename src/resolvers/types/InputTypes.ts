import { User } from "../../models/User";
import { InputType, Field } from "type-graphql";

@InputType({ description: "New user data" })
export class AddUserInput implements Partial<User> {
  @Field()
  firstName: String;

  @Field()
  lastName: String;

  @Field()
  username: String;

  @Field()
  password: String;

  @Field()
  phone: String;

  @Field({ nullable: true })
  birthday: Date;

  @Field((type) => Date, { nullable: true })
  updateTime?: Date;

  @Field((type) => Date, { nullable: true })
  createTime: Date;
}
