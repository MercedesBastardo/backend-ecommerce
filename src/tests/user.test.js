const request = require('supertest');
const app = require('../app.js');

let userId;
let token;

test("POST / test to add a user, it should return status 201", async () => {
    const newUser = {
        firstName: "Reynaldo",
        lastName: "Vicent",
        email: "tatagaitan195@gmail.com",
        password:"654321",
        phone: "+5491123961770"
    }
    const res = await request(app)
    .post("/users")
    .send(newUser);
    userId= res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.email).toBe(newUser.email);
})

test("POST /user/login should do login", async () => {
    
    const user = {
        email: "tatagaitan195@gmail.com",
        password: "654321"
    }
    const res = await request(app)
        .post(`/users/login`)
        .send(user);
        token= res.body.token;
        expect(res.status).toBe(200);
        expect(res.body.user.email).toBe(user.email);
        expect(res.body.token).toBeDefined();
})

test("POST /user/login whith invalid credentials should return 401", async () => {
    
    const user = {
        email: "tatagaitan195@gmail.com",
        password: "1234566"
    }
    const res = await request(app)
        .post(`/users/login`)
        .send(user);
        expect(res.status).toBe(401);
})

test('GET/ test to get all Users, should return status 200', async() => {
    const res= await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2);
})

test("PUT /user should update a user, return 200", async () => {
    
    const updatedUser = {
        firstName: "Reynaldo José"
    }
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(updatedUser)
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe(updatedUser.firstName);
})

test("DELETE /users/:id should delete retun 204", async () => {
    const res = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});