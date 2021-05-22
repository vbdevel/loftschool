const db = require('../models/db')()

module.exports = function () {
    const skills = db.get('skills');
    const {number : age} = skills.find( item => item.text === 'Возраст начала занятий на скрипке');
    const {number : concerts} = skills.find( item => item.text === 'Концертов отыграл');
    const {number : cities} = skills.find( item => item.text === 'Максимальное число городов в туре');
    const {number : years} = skills.find( item => item.text === 'Лет на сцене в качестве скрипача');    
   
    return {
        age: age || '',
        concerts: concerts  || '',
        cities: cities || '',
        years: years || ''
    }
}
