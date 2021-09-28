import UserData from './user.data.js'
import ERROR from '../../errors/errors.js'
import bcrypt from 'bcrypt'
const err = new ERROR()
const data = new UserData()
class UserServices {
    async findOne(any) {
        const doc = await data.findOne(any)
        if (doc) {
            const { password, __v, ...newDoc } = doc.toObject()
            return newDoc
        } else {
            return err.notFoundValue(any)
        }
    }
    async updateOne(id, any) {
        const doc = await data.updateOne(id, any)
        return doc
    }
    async findPassword(obj) {
        const doc = await data.findOne({ _id: obj._id })
        const compare = bcrypt.compareSync(obj.password, doc.password)
        if (compare == false) {
            const { password, __v, ...newDoc } = doc.toObject()
            return newDoc
        } else {
            return err.duplicateValue(doc.password)
        }
    }
    async forgotPass(key, obj) {
        const doc = await data.forgotPass(key, obj)
        return doc
    }
}
export default UserServices
