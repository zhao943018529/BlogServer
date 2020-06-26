import { ObjectType, Field, Arg, ID } from 'type-graphql';
import {
  prop as Property,
  getModelForClass,
  arrayProp,
  modelOptions,
  mongoose,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Ref } from './types';
import { Role } from './Role';

@ObjectType()
@modelOptions({
  schemaOptions: {
    toObject: { virtuals: true },
  },
})
export class User {
  @Field((type) => String)
  readonly id: string;

  @Field((type) => String)
  @Property({ required: true })
  firstName: string;

  @Field((type) => String)
  @Property({ required: true })
  lastName: string;

  @Field((type) => String)
  @Property({ required: true, unique: true })
  username: string;

  @Field((type) => String)
  @Property({ required: true })
  password: string;

  @Field((type) => String)
  @Property({ required: true })
  phone: string;

  @Field((type) => [Role], { nullable: true })
  @arrayProp({ ref: Role, refType: mongoose.Schema.Types.ObjectId })
  roles?: Ref<Role>[];

  @Field((type) => Date, { nullable: true })
  @Property()
  birthday?: Date;

  @Field((type) => Date, { nullable: true })
  @Property()
  updateTime?: Date;

  @Field((type) => Date)
  @Property({ default: Date.now() })
  createTime: Date;

  @Field((type) => String)
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
