const Router = require('koa-router');
const router = new Router();

router.get('/', async ctx => {
  await ctx.render('index',{
    title:'WWW'
  })
});

module.exports = router;
