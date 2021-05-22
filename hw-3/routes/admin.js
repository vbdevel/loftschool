const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const addProduct = require('../models/addProduct')
const addSkill = require('../models/addSkill')
const getSkills = require('../models/getSkills')

router.get('/', (req, res, next) => {
  // TODO: Реализовать, подстановку в поля ввода формы 'Счетчики'
  // актуальных значений из сохраненых (по желанию)
  const skills = getSkills();
  res.render('pages/admin', { title: 'Admin page', ...skills })
})

router.post('/skills', (req, res, next) => {
  /*
  TODO: Реализовать сохранение нового объекта со значениями блока скиллов

    в переменной age - Возраст начала занятий на скрипке
    в переменной concerts - Концертов отыграл
    в переменной cities - Максимальное число городов в туре
    в переменной years - Лет на сцене в качестве скрипача
  */
    if (req.body.age) {
      addSkill({
        "number": req.body.age,
        "text": "Возраст начала занятий на скрипке"
      });
    } 
    if (req.body.concerts) {
      addSkill({
        "number": req.body.concerts,
        "text": "Концертов отыграл"
      })
    } 
    if (req.body.cities) {
      addSkill({
        "number": req.body.cities,
        "text": "Максимальное число городов в туре"
      })
    } 
    if (req.body.years) {
      addSkill({
        "number": req.body.years,
        "text": "Лет на сцене в качестве скрипача"
      })
    } 
    res.redirect('/');
  

  //res.send('Реализовать сохранение нового объекта со значениями блока скиллов')
})

router.post('/upload', (req, res, next) => {
  /* TODO:
   Реализовать сохранения объекта товара на стороне сервера с картинкой товара и описанием
    в переменной photo - Картинка товара
    в переменной name - Название товара
    в переменной price - Цена товара
    На текущий момент эта информация хранится в файле data.json  в массиве products
  */
    const form = formidable.IncomingForm();
    const upload = path.join(process.cwd(), 'public/assets/img/uploads');
    form.uploadDir = upload;
    form.parse(req, async (err, fields, files) => {
      if(err) {
        return next(err);
      }
      const {name, price} = fields;
      const photo = files.photo.name;
      const product = {
        "src": `./assets/img/products/${photo}`,
        "name": name,
        "price": price
      }; 

      try{
        await fs.promises.link(files.photo.path, path.join(process.cwd(), 'public/assets/img/products', photo));
        await fs.promises.unlink(files.photo.path);
        addProduct(product);
        res.redirect('/');
      } catch (err) {
        res.send('Произошла ошибка при загрузке фото');
      } 
    })
    
 // res.send('Реализовать сохранения объекта товара на стороне сервера');
})

module.exports = router
