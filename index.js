import express from 'express'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import auth from './src/auth/auth.routes.js'
import user from './src/user/user.routes.js'
import photo from './src/photos/photo.routes.js'
import album from './src/album/album.routes.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocs } from './config/swagger.js'
import ERROR from './errors/errors.js'
import cron from 'node-cron'
import VerifyServices from './src/verify/verify.services.js'
import SessionServices from './src/sessions/sessions.services.js'
import { forgot, updatePassword } from './src/user/user.validation.js'
import HTTP_CODE from 'http-status-codes'
import UserServices from './src/user/user.services.js'
import { randomNum } from './functions/num.js'
import { expiredMins } from './functions/time.js'
import { mailForgotPassword } from './src/auth/auth.mailer.js'
import jwt from 'jsonwebtoken'

const sessionsService = new SessionServices()
const verifyService = new VerifyServices()
const userService = new UserServices()

dotenv.config()
const app = express()
app.use(express())
app.use(express.json())
app.use(auth)
app.use(user)
app.use(photo)
app.use(album)
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
    res.json('Index')
})
app.get('/forgotpassword', async (req, res, next) => {
    const email = req.body.email
    const validate = forgot.validate({ email })
    if (validate.error) {
        validate.error.code = HTTP_CODE.BAD_REQUEST
        next(validate.error)
    }
    const checkUser = await userService.findOne({ email })
    if (checkUser.email) {
        const code = randomNum()

        const resend = await verifyService.findOne({ email: checkUser.email })
        if (!resend) {
            await mailForgotPassword(code, checkUser.email)
            await verifyService.create({ code, email: checkUser.email, expiredAt: expiredMins(5) })
            res.json('OK')
        } else {
            const newCode = randomNum()
            await mailForgotPassword(newCode, checkUser.email)
            await verifyService.updateOne({ email: checkUser.email }, { code: newCode, expiredAt: expiredMins(5) })
            res.json('Resend')
        }
    }
    if (checkUser.code) {
        next(checkUser)
    }
})
app.get('/recovery/:email', async (req, res) => {
    const email = req.params.email
    const decoded = jwt.verify(email, process.env.JWT_SECRET, (error, result) => {
        if (error) {
            next(err.cannotDecode())
        } else return result
    })
    const code = req.body.code
    await verifyService.findAndUpdate(decoded, code)
    res.json(`localhost:3000/recovery/changepass/${email}`)
})
app.get('/recovery/changepass/:email', async (req, res, next) => {
    const email = req.params.email
    const data = req.body
    const validate = updatePassword.validate(data)
    if (validate.error) {
        validate.error.code = HTTP_CODE.BAD_REQUEST
        next(validate.error)
    }
    const { repeat_password, ...newData } = data
    const decoded = jwt.verify(email, process.env.JWT_SECRET, (error, result) => {
        if (error) next(err.cannotDecode())
        else return result
    })
    const check = await verifyService.find(decoded)
    if (check.status == 'Verified') {
        const forgot = await userService.forgotPass({ email: decoded }, newData)
        if (forgot.modifiedCount == 1 || forgot.matchedCount == 1) {
            await verifyService.delete(decoded)
            res.json('Changed your password!')
        }
    } else {
        next(err.needToVerifyCode())
    }
})
//Error handling
app.use((err, req, res, next) => {
    res.status(err.code).send({ message: err.message })
})
app.all('*', (req, res) => {
    const urlErr = err.notFoundURL(req.path)
    res.status(urlErr.code).send({ message: urlErr.message })
})

//Schedule API
cron.schedule('* * * * *', () => {
    findExpiredVerifyRequests()
    findExpiredSessions()
})
const findExpiredVerifyRequests = async () => {
    const docs = await verifyService.findExprired()
    if (docs.length > 0) {
        docs.map(async doc => {
            await verifyService.delete(doc.email)
        })
    }
}
const findExpiredSessions = async () => {
    const docs = await sessionsService.findExpired()
    if (docs.length > 0) {
        docs.map(async doc => {
            await sessionsService.destroy({ userId: doc.userId })
        })
    }
}
//Server
app.listen(process.env.PORT || 3001, () => {
    console.log('App running on Port : 3000')
    Mongoose.connect(process.env.DB)
})
export default app
