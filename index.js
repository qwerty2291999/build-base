import express from 'express'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import auth from './src/auth/auth.routes.js'
import config from './config/config.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocs } from './config/swagger.js'
import ERROR from './errors/errors.js'

dotenv.config()
const app = express()
app.use(express())
app.use(express.json())
app.use(auth)
const err = new ERROR()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
/**
 * @swagger
 * /:
 *   get:
 *     description: Index Route!
 *     responses:
 *       200:
 *         description: Return index.
 */
//Route
app.get('/', (req, res) => {
    res.send('ABC')
})
//Error handling
app.use((err, req, res, next) => {
    res.status(err.code).send({ message: err.message })
})
app.all('*', (req, res) => {
    const urlErr = err.notFoundURL(req.path)
    res.status(urlErr.code).send({ message: urlErr.message })
})
//Server
app.listen(config.app.port, () => {
    console.log('App running on Port : 3000')
    const {
        db: { host, port, db }
    } = config
    Mongoose.connect(`mongodb://${host}:${port}/${db}`)
})
export default app
