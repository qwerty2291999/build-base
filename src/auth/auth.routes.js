import express from 'express'
import { login, register } from './auth.controller.js'

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

export default app
