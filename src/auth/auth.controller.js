import HTTP_CODE from 'http-status-codes'
import ERROR from '../../errors/errors.js'
import AuthServices from './auth.services.js'
import * as validation from './auth.validation.js'
import jwt from 'jsonwebtoken'
import SessionServices from '../sessions/sessions.services.js'
import { STATUS } from '../user/user.schema.js'
const SessionService = new SessionServices()
const AuthService = new AuthServices()
const err = new ERROR()

export const login = async function (req, res, next) {
    const data = req.body
    const validate = validation.login.validate(data)
    if (validate.error) {
        validate.error.code = HTTP_CODE.BAD_REQUEST
        next(validate.error)
    } else {
        const doc = await AuthService.findOne(data)
        if (doc.message) {
            next(doc)
        } else {
            if (doc.status == STATUS.TRUE) {
                const token = jwt.sign(
                    {
                        userId: doc._id,
                        username: doc.username,
                        email: doc.email,
                        status: doc.status
                    },
                    process.env.JWT_SECRET
                )
                const doc1 = await SessionService.findOne({ userId: doc.id })
                if (!doc1) {
                    await SessionService.create({ userId: doc.id, jwt: token })
                    res.status(HTTP_CODE.OK).json(token)
                } else {
                    await SessionService.updateOne({ userId: doc.id }, { jwt: token })
                    res.status(HTTP_CODE.OK).json(token)
                }
            } else {
                next(err.needToVerify())
            }
        }
    }
}

export const register = async function (req, res, next) {
    const data = req.body
    const validate = validation.register.validate(data)
    if (validate.error) {
        validate.error.code = HTTP_CODE.BAD_REQUEST
        next(validate.error)
    } else {
        const { repeat_password, ...newData } = data
        const doc = await AuthService.register(newData)
        if (doc.keyPattern) {
            if (doc.keyValue.username) {
                next(err.duplicateValue(doc.keyValue.username))
            } else {
                next(err.duplicateValue(doc.keyValue.email))
            }
        } else {
            res.status(HTTP_CODE.CREATED).send({ message: 'Registered and an email has been send to your email' })
        }
    }
}
export const logout = async function (req, res, next) {
    if (req.headers.token) {
        const token = req.headers.token
        jwt.verify(token, process.env.JWT_SECRET, async (error, result) => {
            if (error) {
                next(err.cannotDecode())
            } else {
                await SessionService.destroy({ userId: result.userId })
                res.status(HTTP_CODE.OK).json('OK')
            }
        })
    } else {
        res.status(HTTP_CODE.BAD_REQUEST).json('Failed')
    }
}
export const verify = async function (req, res, next) {
    const email = req.params.email
    const doc = await AuthService.verify(email)
    if (typeof doc === 'object') {
        next(doc)
    } else {
        res.redirect('/auth/success')
    }
}
export const success = async function (req, res, next) {
    res.status(HTTP_CODE.OK).json('Verified!')
}
