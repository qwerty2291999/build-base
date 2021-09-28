import ERROR from '../../errors/errors.js'
import photoSchema from '../photos/photos.schema.js'
const err = new ERROR()
class photoData {
    async createOne(obj) {
        const doc = await photoSchema.create(obj)
        return doc
    }
    async createMany(arr) {
        const doc = await photoSchema.insertMany(arr)
        return doc
    }
    async findOwn(uid) {
        const doc = await photoSchema.find(uid)
        return doc
    }
    async findAll() {
        const docs = await photoSchema.find({ status: 'Public' })
        return docs
    }
    async findOne(id) {
        try {
            const doc = await photoSchema.findOne(id)
            return doc
        } catch (err) {
            return err
        }
    }
    async update(id, obj) {
        const doc = await photoSchema.updateOne(id, { $set: obj })
        return doc
    }
    async delete(id) {
        const doc = await photoSchema.deleteOne(id)
        return doc
    }
    async findAlbum(id) {
        const docs = await photoSchema.find(id)
        return docs
    }
}
export default photoData
