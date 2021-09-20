import AuthData from './auth.data.js'
import bcrypt from 'bcrypt'
import ERROR from '../../errors/errors.js'
const err = new ERROR()
const data = new AuthData()
class AuthServices {
    async findOne(obj) {
        if (obj.username) {
            const doc = await data.findOne({ username: obj.username })
            if (!doc) {
                return err.wrongUsernameOrPassword()
            } else {
                const compare = await bcrypt.compare(obj.password, doc.password)
                if (compare === true) {
                    return doc
                } else {
                    return err.wrongUsernameOrPassword()
                }
            }
        }
        if (obj.email) {
            const doc = await data.findOne({ email: obj.email })
            if (!doc) {
                return err.wrongUsernameOrPassword()
            } else {
                const compare = await bcrypt.compare(obj.password, doc.password)
                if (compare === true) {
                    return doc
                } else {
                    return err.wrongUsernameOrPassword()
                }
            }
        }
    }
    async register(obj) {
        const doc = await data.register(obj)
        return doc
    }
}
export default AuthServices
