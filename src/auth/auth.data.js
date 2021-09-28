import UserData from '../user/user.data.js'
import { STATUS } from '../user/user.schema.js'
import ERROR from '../../errors/errors.js'
const err = new ERROR()
const data = new UserData()
class AuthData {
    async findOne(any) {
        const doc = await data.findOne(any)
        return doc
    }

    async register(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async verify(email) {
        const doc = await this.findOne({ email })
        if (!doc) {
            return err.notFoundValue(email)
        }
        await data.updateOne({ _id: doc._id }, { status: STATUS.TRUE })
    }
}
export default AuthData
