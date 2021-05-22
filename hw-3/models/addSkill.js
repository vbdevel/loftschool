const db = require('../models/db')()

module.exports = function (skill) {
    const skills = db.get('skills');
    skills.push(skill);
    db.set("skills", skills);
    db.save();
}
