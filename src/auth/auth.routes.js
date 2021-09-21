import express from 'express'
import { login, register, test } from './auth.controller.js'
import { Auth } from './auth.middlware.js'

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login route if success
 *     responses:
 *       200:
 *         description: Returns an object contains user infos.
 */
const app = express.Router()

app.post('/auth/login', login)
app.post('/auth/register', register)
app.get('/auth/test', Auth, test)

export default app
