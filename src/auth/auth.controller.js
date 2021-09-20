import { HTTP_CODE } from '../../errors/httpCode.js'
import ERROR from '../../errors/errors.js'
import AuthServices from './auth.services.js'
import * as validation from './auth.validation.js'
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
            res.status(HTTP_CODE.OK).json(doc)
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
            res.status(HTTP_CODE.CREATED).json(doc)
        }
    }
}
