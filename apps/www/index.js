const Router = require('koa-router');
const router = new Router();
const os = require('os');
const path = require('path');
const fs = require('fs');

router.get('/', async ctx => {
  await ctx.render('index',{
    title:'Hello'
  })
});

const tmp_dir = os.tmpdir();
const upload_dir = path.join(__dirname, "../../uploads/");

router.post('/upload', async ctx => {
  const files = ctx.request.files.file;
  for (const key in files) {
    const file = files[key];
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(upload_dir, Math.random().toString()));
    // const stream = fs.createWriteStream(path.join(tmp_dir, Math.random().toString()));
    reader.pipe(stream);
    console.log('uploading %s -> %s', file.name, stream.path);
  }
  ctx.body = 'ok';
});

module.exports = router;
