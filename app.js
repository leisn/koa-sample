const koa = require('koa');
const body = require('koa-body');
const logger = require('koa-logger');
const serve = require('koa-static');
const views = require('koa-views');
const error = require('koa-error');
const path = require('path');

const vhost = require('./apps/vhost');

var app = new koa();
app.subdomainOffset = 1;

app.use(logger());

//Error handler
app.use(error({
    engine: 'pug',
    template: path.join(__dirname, '/views/error.pug')
}));

app.use(body({ multipart: true }));

//Static files
app.use(serve(path.join(__dirname, '/public')));

//View engine setup
app.use(views(path.join(__dirname, '/views'), { extension: 'pug' }));

//Register subdomain, routers inside
vhost.Register(app);


module.exports = app;
