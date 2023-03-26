const Product = require("./Product");
const Category = require("./Category");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");
const Cart = require("./Cart");


Product.belongsTo(Category);
Category.hasMany(Product);

ProductImg.belongsTo(Product);
Product.hasMany(ProductImg);

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsTo(Product);
Product.hasMany(Cart);

Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);

