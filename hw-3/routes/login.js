const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функцию входа в админ панель по email и паролю
  //res.send('Реализовать функцию входа по email и паролю')
    if(req.body.email === 'it.vbvit@gmail.com' && req.body.password === '1qaz') {
      res.redirect('/admin');
    } else {
      res.send('email либо пароль не совпадают')
    }
})

module.exports = router
