const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const config = require('../config.json');
const { products, skills } = require('../data.json')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функционал отправки письма.
  const {name, email, message} = req.body;
  if(!name || !email || !message) {
      res.send('Все поля должны быть заполнены')
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
      res.send("Произошла ошибка при отправке email: " + err)
      return 1
    }
    res.send("Сообщение успешно отправлено")
  })

})

module.exports = router
