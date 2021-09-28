import ERROR from '../../errors/errors.js'
import AlbumData from './album.data.js'
import { STATUS } from './album.schema.js'
const err = new ERROR()
const data = new AlbumData()
class AlbumServices {
    async create(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async findOne(id) {
        const doc = await data.findOne(id)
        if (doc.reason) {
            return err.notFoundValue(id._id)
        } else {
            return doc
        }
    }
    async findOwner(uid, id) {
        const doc = await data.findOne(id)
        if (doc == null) {
            return err.notFoundValue(id)
        }
        if (uid != doc.owner) {
            return err.noPermission(id._id)
        } else {
            return doc
        }
    }
    async find() {
        const docs = await data.find({ status: 'Public' })
        return docs
    }
    async updateOne(id, obj) {
        const doc = await data.updateOne(id, obj)
        return doc
    }
    async delete(id) {
        const doc = await data.delete(id)
        return doc
    }
    async set(obj) {
        if (obj.status == STATUS.TRUE) {
            const doc1 = await data.update({ _id: obj.id }, { status: STATUS.FASLE })
            return doc1
        }
        if (obj.status == STATUS.FASLE) {
            const doc1 = await data.update({ _id: obj.id }, { status: STATUS.TRUE })
            return doc1
        }
    }
}
export default AlbumServices
