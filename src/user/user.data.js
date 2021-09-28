import userSchema from './user.schema.js'
class UserData {
    async create(obj) {
        try {
            const doc = await userSchema.create(obj)
            return doc
        } catch (err) {
            if (err) {
                return err
            }
        }
    }
    async findOne(any) {
        const doc = await userSchema.findOne(any)
        return doc
    }
    async updateOne(id, any) {
        const doc = await userSchema.updateOne(id, { $set: any, updatedAt: Date.now() })
        return doc
    }
    async forgotPass(key, any) {
        const doc = await userSchema.updateOne(key, { $set: any })
        return doc
    }
}
export default UserData
