// import { Context } from 'koa';
import { UserModel } from '../models/User';

export default async (ctx: any, next: () => void) => {
  const { user, jwtOriginalError } = ctx.state;
  const auth = ctx.headers.authorization;
  if (jwtOriginalError != null) {
    jwtOriginalError.status = 401;
    throw jwtOriginalError;
  }

  if (user != null) {
    const model = await UserModel.findById(user.id).populate(
      'roles',
      'id title'
    );
    ctx.request.user = model;
  }

  await next();
};
