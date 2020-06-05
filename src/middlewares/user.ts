// import { Context } from 'koa';
import { UserModel } from '../models/User';

export default async (ctx: any, next: () => void) => {
  const { user } = ctx.state;
  if (user != null) {
    const model = await UserModel.findById(user.id);
    ctx.request.user = model;
  }

  await next();
};
