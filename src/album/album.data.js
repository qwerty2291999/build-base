import albumSchema from './album.schema.js'
class AlbumData {
    async create(obj) {
        const doc = await albumSchema.create(obj)
        return doc
    }
    async findOne(id) {
        try {
            const doc = await albumSchema.findById(id)
            return doc
        } catch (err) {
            if (err) {
                return err
            }
        }
    }
    async find(any) {
        const docs = await albumSchema.find(any)
        return docs
    }
    async updateOne(id, obj) {
        const doc = await albumSchema.updateOne(id, { $set: obj })
        return doc
    }
    async delete(id) {
        const doc = await albumSchema.deleteOne(id)
        return doc
    }
    async update(id, obj) {
        const doc = await albumSchema.updateOne(id, { $set: obj })
        return doc
    }
}
export default AlbumData
