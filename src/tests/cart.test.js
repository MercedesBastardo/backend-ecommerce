const request = require('supertest');
const app = require('../app.js');
const Product = require('../models/Product.js');
require('../models');

let cartId;
let token;

beforeAll(async()=> {
    const credentials = {
        email: "test@gmail.com",
        password : "test1234"
    }
    const res = await request(app)
        .post('/users/login')
        .send(credentials)
    token = res.body.token;
})

test("POST / test to add a Cart, it should return status 201", async () => {
    const  product = await Product.create({
        title: "Samsung a13",
        description: "Edición limitada",
        price: 400
    });
    const cart = {
        quantity : 2,
        productId: product.id
    }
    const res = await request(app)
    .post("/carts")
    .send(cart)
    .set('Authorization', `Bearer ${token}`);
    cartId= res.body.id;
await product.destroy();
	expect(res.statusCode).toBe(201);
    expect(res.body.quantity).toBe(cart.quantity);
})

test('GET/ test to get alls Cart, should return status 200', async() => {
    const res= await request(app)
    .get('/carts')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /carts should update a cart, return 200", async () => {
    
    const updatedCart = {
        quantity : 5
    }
    const res = await request(app)
        .put(`/carts/${cartId}`)
        .send(updatedCart)
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.quantity).toBe(updatedCart.quantity);
})

test("DELETE /carts/:id should delete retun 204", async () => {
    const res = await request(app)
    .delete(`/carts/${cartId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});