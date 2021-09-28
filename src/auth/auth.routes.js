import express from 'express'
import { login, register, logout, verify, success } from './auth.controller.js'

/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: Login route if success
 *     responses:
 *       200:
 *         description: Returns an object contains user infos.
 */
const app = express()
app.use(express())

app.post('/auth/login', login)
app.post('/auth/register', register)
app.post('/auth/logout', logout)
app.get('/auth/success', success)
app.get('/auth/verification/:email', verify)

export default app
