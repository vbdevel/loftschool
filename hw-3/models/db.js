const path = require('path')
const nconf = require('nconf')

module.exports = function () {
    return nconf
        .argv()
        .env()
        .file({ file: path.join(__dirname, '../data.json')})
}