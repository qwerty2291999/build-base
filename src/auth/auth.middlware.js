import ERROR from '../../errors/errors.js'
const err = new ERROR()
import jwt from 'jsonwebtoken'
import { STATUS } from '../user/user.schema.js'
export async function Auth(req, res, next) {
    const token = req.headers.token
    if (token == undefined) {
        next(err.invalidToken())
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
        if (error) {
            next(err.cannotDecode())
        } else {
            if (result.status == STATUS.TRUE) {
                req.userId = result.userId
                next()
            } else {
                next(err.needToVerify())
            }
        }
    })
}
