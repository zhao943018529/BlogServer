import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/User';

const router = new Router();

router.post('/login', async (ctx) => {
  const params = ctx.request.body;
  const user = await UserModel.findOne({
    username: params.username,
    password: params.password,
  });
  ctx.status = 200;
  if (user != null) {
    const token = jwt.sign({ ...user }, (ctx as any).secret, {
      expiresIn: 60,
    });
    ctx.body = {
      code: 200,
      data: token,
    };
  } else {
    ctx.body = {
      code: 500,
      message: 'username or password is incorrect',
    };
  }
});

router.get('/test', async (ctx) => {
  const val = await new Promise(function (resolve) {
    setTimeout(
      () => resolve('aa---aa--a--a--a---a-a--a-a-a--a-a--a-a-a'),
      1000
    );
  });
  ctx.body = val;
});

export default router;
