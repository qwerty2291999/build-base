import sessionsSchema from './sessions.schema.js'
class SessionsData {
    async create(obj) {
        await sessionsSchema.create(obj)
    }
    async findOne(obj) {
        const doc = await sessionsSchema.findOne(obj)
        return doc
    }
    async destroy(id) {
        await sessionsSchema.deleteOne(id)
    }
    async updateOne(id, data) {
        const a = await sessionsSchema.updateOne(id, { $set: data })
        console.log(id, data)
    }
    async findAll() {
        const docs = await sessionsSchema.find()
        return docs
    }
}
export default SessionsData
