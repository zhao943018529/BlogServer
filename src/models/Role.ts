import { ObjectType, ID, Field } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Ref } from './types';

@ObjectType({ description: 'role' })
export class Role {
  @Field((type) => ID)
  readonly id: string;

  @Field((type) => String)
  @Property({ unique: true, required: true })
  title: string;

  @Field((type) => String)
  @Property({ required: true })
  description: string;

  @Field((type) => String)
  @Property({ required: true })
  createBy: string;

  @Field((type) => Date)
  @Property({ required: true, default: Date.now })
  createTime: Date;
}

export const RoleModel = getModelForClass(Role);
