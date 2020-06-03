const Subdomain = require('koa-subdomain');

const subdomain = new Subdomain();

const wwwRouter = require('./www/index');

const subSites = {
    www: wwwRouter,
    user: require('./user/index'),
};

exports.Register = function (app) {
    
    for (const key in subSites) {
        const router = subSites[key];
        subdomain.use(key, router.routes());
    }
    subdomain.use('', wwwRouter.routes());

    app.use(subdomain.routes());
};
