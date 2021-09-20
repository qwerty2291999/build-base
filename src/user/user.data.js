import userSchema from './user.schema.js'
class UserData {
    async create (obj) {
        try {
            const doc = await userSchema.create(obj)
            return doc
        } catch (err) {
            if (err) {
                return err
            }
        }
    }

    async findOne (any) {
        const doc = await userSchema.findOne(any)
        return doc
    }
}
export default UserData
