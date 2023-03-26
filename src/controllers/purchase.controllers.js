const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Purchase.findAll({include: [Product], where: {userId}});
    return res.json(results);
});


const purchaseCart = catchError(async(req, res) => {
    const cart = await Cart.findAll({ 
        where: {userId: req.user.id}, 
        attributes: ['quantity', 'productId', 'userId'],
        raw: true
    })
    await Purchase.bulkCreate(cart);
    await Cart.destroy({ where: {userId: req.user.id} })
    // cart.forEach(async product => {
    //     await Purchase.create({
    //         quantity: product.quantity,
    //         productId: product.productId,
    //         userId: product.userId
    //     });
    // })
    return res.json(cart);
})


module.exports = {
    getAll,
    purchaseCart
}