
const get = async (ctx, next) => {
  return await ctx.render('pages/login', { title: 'SignIn page'})
}

const post = async (ctx, next) => {
  const {email, password } = ctx.request.body;
  if(email === 'it.vbvit@gmail.com' && password === '1qaz') {
    ctx.redirect('/admin');
  } else {
    ctx.body = 'email либо пароль не совпадают'
  }
}

module.exports = {
  get,
  post
}
