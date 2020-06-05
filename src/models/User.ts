import { ObjectType, Field, Arg, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

@ObjectType()
export class User {
  @Field((type) => ID)
  readonly id: String;

  @Field((type) => String)
  @Property({ required: true })
  firstName: String;

  @Field((type) => String)
  @Property({ required: true })
  lastName: String;

  @Field((type) => String)
  @Property({ required: true, unique: true })
  username: String;

  @Field((type) => String)
  @Property({ required: true })
  password: String;

  @Field((type) => String)
  @Property({ required: true })
  phone: String;

  @Field((type) => Date, { nullable: true })
  @Property()
  birthday?: Date;

  @Field((type) => Date, { nullable: true })
  @Property()
  updateTime?: Date;

  @Field((type) => Date)
  @Property({ default: Date.now() })
  createTime: Date;

  @Field()
  public get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  public set fullName(full: string) {
    const [firstName, lastName] = full.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export const UserModel = getModelForClass(User);
