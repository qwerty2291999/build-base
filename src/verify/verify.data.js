import VerifySchema from './verify.schema.js'
import { STATUS } from './verify.schema.js'
class VerifyData {
    async find(email) {
        const doc = await VerifySchema.findOne({ email })
        return doc
    }
    async findAll() {
        const docs = await VerifySchema.find()
        return docs
    }
    async create(obj) {
        const doc = await VerifySchema.create(obj)
        return doc
    }
    async delete(email) {
        await VerifySchema.deleteOne({ email })
    }
    async update(email) {
        const doc = await VerifySchema.updateOne({ email }, { $set: { status: STATUS.TRUE } })
        return doc
    }
    async findOne(any) {
        const doc = await VerifySchema.findOne(any)
        return doc
    }
    async updateOne(key, obj) {
        const doc = await VerifySchema.updateOne(key, { $set: obj })
        return doc
    }
}
export default VerifyData
