const request = require('supertest')
const app = require('../app')

beforeAll(async () => {
    const res = await request(app)
    .get('/user/clear')
  });


describe('Sanity Check', () => {
    it('should always be true', () => {
      expect(true).toBe(true)
    })
})

describe('User Check', () => {
    it('should return okay for a new emiail', async () => {
      const res = await request(app)
        .get('/user/checkemail?email=test1@gmail.com')
        
        expect(res.statusCode).toEqual(200)
    })
    it('should return 201 for new test user', async () => {
        const res = await request(app)
          .post('/user/test')
          .send({
            email:"testuser@test.com",
            password:"12345",
            code: "IMATESTER",
            name: "beegcompany",
            industry: "myindustry"
          })
          
          expect(res.statusCode).toEqual(201)
    })
    it('should reject and return 400 for checking with existing email', async () => {
        const res = await request(app)
        .get('/user/checkemail?email=testuser@test.com')

        expect(res.statusCode).toEqual(400)
    })

    it('should reject test verify of non existant email and return 400', async () => {
        const res = await request(app)
        .get('/user/testverify?email=non@existant.com')

        expect(res.statusCode).toEqual(400)
    })

    it('should accept test verify of existant email and return 200', async () => {
        const res = await request(app)
        .get('/user/testverify?email=testuser@test.com')

        expect(res.statusCode).toEqual(200)
    })
  })