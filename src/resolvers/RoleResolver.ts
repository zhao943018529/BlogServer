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
import { ObjectId } from 'mongodb';
import { Role, RoleModel } from '../models/Role';
import { User } from '../models/User';
import { BaseResponse } from './types/InputTypes';

@ObjectType()
class RoleResonse extends BaseResponse {
  // @Field()
  // code: number;

  // @Field()
  // message: string;

  // @Field()
  // success: boolean;

  @Field((returns) => Role, { nullable: true })
  data?: Role;
}

@ObjectType()
class RolesResonse extends BaseResponse {
  // @Field()
  // code: number;

  // @Field()
  // message: string;

  // @Field()
  // success: boolean;

  @Field((returns) => [Role], { nullable: true })
  data?: Role[];
}

@Resolver()
export default class RoleResolver {
  @Authorized('Admin')
  @Query((returns) => RolesResonse)
  async getRoles(@Ctx('user') user: User) {
    const roles = await RoleModel.find({}).populate(
      'createBy',
      'username firstName lastName'
    );

    return {
      code: 200,
      message: 'successfully',
      success: true,
      data: roles,
    };
  }

  @Authorized('Admin')
  @Mutation((returns) => RoleResonse)
  async addRole(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx('user') user: User
  ) {
    const roleInst = new RoleModel({
      title,
      description,
      createBy: new ObjectId(user.id),
    });

    const role = await roleInst.save();

    return {
      code: 200,
      message: 'successfully',
      success: true,
      data: role,
    };
  }

  @Authorized('Admin')
  @Mutation((returns) => RoleResonse)
  async deleteRole(@Arg('ids') ids: string, @Ctx('user') user: User) {
    const res = await RoleModel.deleteMany({ _id: { $in: ids.split(',') } });

    return {
      code: 200,
      message: 'successfully',
      success: true,
    };
  }

  @Mutation((returns) => RoleResonse)
  async updateRole(
    @Arg('id') id: string,
    @Arg('title') title: string,
    @Ctx('user') user: User
  ) {
    const role = await RoleModel.findOneAndUpdate({ _id: id }, { title });

    return {
      code: 200,
      message: 'successfully',
      success: true,
      data: role,
    };
  }
}
