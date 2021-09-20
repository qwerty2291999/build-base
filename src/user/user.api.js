import express from 'express'
import { login, register } from './user.controller.js'

const app = express.Router()

app.post('/auth/login', login)
app.post('/auth/register', register)

export default app
