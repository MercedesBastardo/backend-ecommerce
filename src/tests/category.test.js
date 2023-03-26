const request = require('supertest');
const app = require('../app.js');

let categoryId;
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

test("POST / test to add an Category, it should return status 201", async () => {
    const newCategory = {
        name: "Tecnología"
    }
    const res = await request(app)
    .post("/categories")
    .send(newCategory)
    .set('Authorization', `Bearer ${token}`);
    categoryId= res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategory.name);
})

test('GET/ test to get alls Categories, should return status 200', async() => {
    const res= await request(app)
    .get('/categories')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1);
})

test("DELETE /categories/:id should delete retun 204", async () => {
    const res = await request(app)
    .delete(`/categories/${categoryId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});