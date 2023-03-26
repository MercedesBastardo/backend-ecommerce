const request = require('supertest');
const app = require('../app.js');
const ProductImg = require('../models/ProductImg.js');
require('../models');

let productId;
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

test("POST / test to add a product, it should return status 201", async () => {
    const newProduct = {
        title: "Samsung A22",
        description: "Totalmente nuevo",
        price: 300
    }
    const res = await request(app)
    .post("/products")
    .send(newProduct)
    .set('Authorization', `Bearer ${token}`);
    productId= res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProduct.title);
})

test('GET/ test to get all Products, should return status 200', async() => {
    const res= await request(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1);
})

test("PUT /products should update a product, return 200", async () => {
    
    const updatedProduct = {
        price: 500
    }
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(updatedProduct)
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.price).toBe(updatedProduct.price);
})

test("POST /products/:id/images should set the products Images, return 200", async () => {
    
    const image = await ProductImg.create({
        url: "jhdfkdfffvcdffd",
        filename: "cmnfcnjmfnfv"
    })
    const res = await request(app)
        .post(`/products/${productId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);
    await image.destroy();
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
})

test("DELETE /products/:id should delete retun 204", async () => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});