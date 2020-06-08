const Router = require('koa-router');
const router = new Router();
const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');

const secretKey = "secret key example.";

// Custom 401 handling if you don't want to expose koa-jwt errors to users
router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message
      };
    } else {
      throw err;
    }
  }
});

router.get('/login', async ctx => {
  var token = jwt.sign({ login: true, name: "normal user" }, secretKey);
  ctx.cookies.set('jwt_token', token, { httpOnly: true });
  ctx.body = 'Hello from user app';
});

// var publicKey = fs.readFileSync('/path/to/public.pub');
// app.use(koaJwt({ secret: publicKey }).unless({ path: [/^\/login] }));
// Middleware below this line is only reached if JWT token is valid
router.use(koaJwt({
  secret: secretKey,
  key: "user",  //ctx.state.user
  tokenKey: "token",  //ctx.state.token
  cookie: 'jwt_token',
  debug: true,
}));
//---------------------------------------------------------------

// Protected
router.get('/', async ctx => {
  ctx.body = {
    login: ctx.state.user.login,
    name: ctx.state.user.name,
    token: ctx.state.token
  };
});

router.get('/logout', async ctx => {
  ctx.cookies.set("jwt_token", '', { maxAge: 0 })
  ctx.body = 'logout';
});

module.exports = router;
