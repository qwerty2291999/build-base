import ERROR from '../../errors/errors.js'
const err = new ERROR()
import jwt from 'jsonwebtoken'
import { STATUS } from '../user/user.schema.js'
import SessionServices from '../sessions/sessions.services.js'
const SessionService = new SessionServices()
export async function Auth(req, res, next) {
    if (req.headers.token) {
        //verify headers token
        const token = req.headers.token
        jwt.verify(token, process.env.JWT_SECRET, async (error, result) => {
            if (error) {
                next(err.cannotDecode())
            } else {
                //verify DB token
                const doc = await SessionService.findOne({ userId: result.userId })
                if (doc) {
                    if (token === doc.jwt) {
                        jwt.verify(doc.jwt, process.env.JWT_SECRET, async (error, result) => {
                            if (error) {
                                next(err.cannotDecode())
                            } else {
                                req.userId = result.userId
                                next()
                            }
                        })
                    } else {
                        next(err.tokenChanged())
                    }
                } else {
                    next(err.pleaseLogin())
                }
            }
        })
    } else {
        next(err.invalidToken())
    }
}
