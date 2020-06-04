const Router = require('koa-router');
const router = new Router();
const os = require('os');
const path = require('path');
const fs = require('fs');

router.get('/', async ctx => {
  await ctx.render('index', {
    title: 'HELLO'
  })
});

const tmp_dir = os.tmpdir();
const upload_dir = path.join(__dirname, "../../uploads/");

function saveFile(file) {
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(upload_dir, Math.random().toString()));
  // const stream = fs.createWriteStream(path.join(tmp_dir, Math.random().toString()));
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);
}

router.post('/upload', async ctx => {
  ctx.throw(new Error('boom boom'));
  const files = ctx.request.files.file;
  if (files instanceof Array) {
    for (const key in files) {
      saveFile(files[key])
    }
  } else {
    saveFile(files);
  }
  ctx.body = 'ok';
});

module.exports = router;
