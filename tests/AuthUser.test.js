const request = require('supertest');
const server = require('../server');

// authorized user tests
const userInfoMock = {
    name: 'test2',
    email: 'test2@test.com',
    password: 'Aa123456!'
}

describe('Authorized User Tests', () => {
afterAll(async () => {
    await server.close();
})

//authorized user can get info
test('Authorized User Can Get Info', async () => {

    await request(server)
    .post('/users/register')
    .send(userInfoMock)
    .expect(201);

    const loginRes = await request(server)
    .post('/users/login')
    .send(userInfoMock)
    .expect(200)
 
    const infoRes = await request(server)
    .get('/api/v1/information')
    .set('authorization', `bearer ${loginRes.body.accessToken}`)
    .expect(200)

    expect(infoRes.status).toBe(200);
    
    const infoRes2 = await request(server)
    .get('/api/v1/information')
    .set('authorization', 'bearer notValidToken')
    
    expect(infoRes2.status).toBe(403)

    const  infoRes3 = await request(server)
    .get('/api/v1/information')
    
    expect(infoRes3.status).toBe(401)
})
})

