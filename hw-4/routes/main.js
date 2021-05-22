const nodemailer = require('nodemailer')
const config = require('../config.json');
const { products, skills } = require('../data.json')

const get = async (ctx, next) => {
  return await ctx.render('pages/index', { title: 'Main page', products, skills })
}

const post = async (ctx, next) => {
  const {name, email, message} = ctx.request.body;
  if(!name || !email || !message) {
      ctx.body = 'Все поля должны быть заполнены'
      return 1;
  }
  console.log(config);
  const smtp = nodemailer.createTransport(config.mail.smtp)
  const mailOptions = {
    from: `"loft.node@gmail.com" <loft.node@gmail.com>`,
    to: email,
    subject: config.mail.subject,
    text: message
  }
  smtp.sendMail(mailOptions, (err, result) => {
    if(err) {
      ctx.body = "Произошла ошибка при отправке email: " + err
      return 1
    }
    ctx.body = "Сообщение успешно отправлено"
  })
}

module.exports = {
  get,
  post
}
