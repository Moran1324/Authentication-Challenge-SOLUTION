const request = require('supertest');
const server = require('../app');

//Admin tests
const userAdminMock = {
    name: 'admin',
    email: 'admin@email.com',
    password: 'Rc123456!'
}

describe('Admin Tests', () => {
    afterAll(async () => {
        await server.close();
    })
    test('Only Admin Can Get Users List', async () => {
        
        const adminLoginRes = await request(server)
        .post('/users/login')
        .send(userAdminMock)
        .expect(200)
        
        expect(adminLoginRes.body.isAdmin).toBe(true)
        expect(adminLoginRes.body.accessToken.length > 0).toBe(true)

        const getAllUsersRes = await request(server)
        .get('/users/all')
        .set('authorization', `Bearer ${adminLoginRes.body.accessToken}`)
        .expect(200)

        expect(getAllUsersRes.body.length > 0).toBe(true)

        const getAllUsersNoAdminRes = await request(server)
        .get('/users/all')
        .set('authorization', `Bearer token`)
        .expect(403 || 401)

        expect(getAllUsersNoAdminRes.body.length > 0).toBe(false)
    }) 
})



// await timeout(2000);

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

