const db = require('../models/db')()

module.exports = function (product) {
    const products = db.get('products');
    products.push(product);
    db.set("products", products);
    db.save();
}
