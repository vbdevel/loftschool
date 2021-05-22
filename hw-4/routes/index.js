const Router = require('koa-router');
const router = new Router();
const admin = require('./admin');
const main = require('./main');
const login = require('./login');

router
        .get('/admin', admin.root)
        .post('/admin/upload', admin.upload)
        .post('/admin/skills', admin.skills)
        .get('/', main.get)
        .post('/', main.post)
        .get('/login', login.get)
        .post('/login', login.post)

//router.use('/', require('./main'))

//router.use('/login', require('./login'))


//router.use('/admin', require('./admin'))

module.exports = router
