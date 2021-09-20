// import AuthServices from './src/auth/auth.services.js'
// const AuthService = new AuthServices
import app from './index-test.js'
import chai from 'chai'
import chaiHttp from 'chai-http'
chai.use(chaiHttp)

describe('/test Auth login/register API', () => {
    it('test success register', done => {
        chai.request(app)
            .post('/auth/register')
            .send({
                username: 'testAccount2',
                password: '123',
                repeat_password: '123',
                name: 'duong van long',
                email: 'testAccount2@gmail.com'
            })
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('createdAt')
            })
        done()
    })
    it('test failed register', done => {
        chai.request(app)
            .post('/auth/register')
            .send({
                username: 'long2291999',
                password: '123',
                repeat_password: '123',
                name: 'duong van long',
                email: 'blackcat22.ngu@gmail.com'
            })
            .end((err, res) => {
                res.should.have.status(406)
                res.body.should.have.property('message')
            })
        done()
    })
    it('test success login', done => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: 'blackcat22.ngu@gmail.com',
                password: '123'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('email')
            })
        done()
    })
    it('test failed login', done => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: 'blackcat22adsad.ngu@gmail.com',
                password: '123asdas'
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.have.property('message')
            })
        done()
    })
})
