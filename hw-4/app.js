const Koa = require('koa');
const Pug = require('koa-pug') ;
const static = require('koa-static');
const koaBody = require('koa-body');
const path = require('path')

const app = new Koa();
const mainRouter = require('./routes/')
app.use(koaBody({
    formidable: {
      uploadDir: path.join(process.cwd(), 'public/assets/img/uploads')
    },
    multipart: true

}));

app.use(static('./public') );
const pug = new Pug({
  viewPath: './views',
  app: app 
});
app.use(mainRouter.routes());

app.listen(3000, () => {})
