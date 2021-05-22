const path = require('path')
const fs = require('fs')
const addProduct = require('../models/addProduct')
const addSkill = require('../models/addSkill')
const getSkills = require('../models/getSkills')

const root = async (ctx, next) => {
  const skills = getSkills();
  return await ctx.render('pages/admin', { title: 'Admin page', ...skills })
}


const upload = async (ctx, next) => {
    const {name, price} = ctx.request.body;
    const photo = ctx.request.files.photo.name;
    const product = {
      "src": `./assets/img/products/${photo}`,
      "name": name,
      "price": price
    }; 
    try{
      //console.log('copy: ', ctx.request.files.photo.path, path.join(process.cwd(), 'public/assets/img/products', photo)); 
      await fs.promises.link(ctx.request.files.photo.path, path.join(process.cwd(), 'public/assets/img/products', photo));
      //console.log('delete: ', fctx.request.files.photo.path);
      await fs.promises.unlink(ctx.request.files.photo.path);
      //console.log('add product: ', product);
      addProduct(product);
      ctx.redirect('/');
    } catch (err) {
        ctx.status = 500;
        ctx.body = 'Произошла ошибка при загрузке фото: ' + err;
    } 

}

const skills = async(ctx, next) => {
  const {age, concerts, cities, years} = ctx.request.body;
  if (age) {
    addSkill({
      "number": age,
      "text": "Возраст начала занятий на скрипке"
    });
  } 
  if (concerts) {
    addSkill({
      "number": concerts,
      "text": "Концертов отыграл"
    })
  } 
  if (cities) {
    addSkill({
      "number": cities,
      "text": "Максимальное число городов в туре"
    })
  } 
  if (years) {
    addSkill({
      "number": years,
      "text": "Лет на сцене в качестве скрипача"
    })
  } 
  ctx.redirect('/');  
}

module.exports = {
  root,
  upload,
  skills
}
