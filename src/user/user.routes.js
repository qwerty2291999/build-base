import express from 'express'
import { me, changePassword, updateInfos } from './user.controller.js'
import { Auth } from '../auth/auth.middlware.js'

const app = express()
app.use(express())
app.get('/user', Auth, me)
app.post('/user/changepassword', Auth, changePassword)
app.post('/user/update', Auth, updateInfos)

export default app
