import photoData from './photos.data.js'
import ERROR from '../../errors/errors.js'
const err = new ERROR()
const data = new photoData()
class PhotoServices {
    async createOne(obj) {
        const doc = await data.createOne(obj)
        return doc
    }
    async createMany(arr) {
        const doc = await data.createMany(arr)
        return doc
    }
    async findOwn(uid) {
        const doc = await data.findOwn(uid)
        return doc
    }
    async findAll(page) {
        const docs = await data.findAll()
        const itemPerPage = 5
        const slice = docs.slice(itemPerPage * page - itemPerPage, itemPerPage * page)
        return slice
    }
    async findAlbum(id) {
        const docs = await data.findAlbum(id)
        return docs
    }
    async findOne(uid, id) {
        const doc = await data.findOne(id)
        if (doc.reason) {
            return err.notFoundValue(id)
        }
        if (doc.status == 'Private') {
            if (doc.userId == uid) {
                return doc
            } else {
                return err.inPrivate()
            }
        } else {
            return doc
        }
    }
    async findAndDo(uid, id) {
        const doc = await data.findOne(id)
        if (doc.reason) {
            return err.notFoundValue(id)
        }
        if (doc.userId == uid) {
            return doc
        }
    }
    async update(id, obj) {
        const doc = await data.update(id, obj)
        return doc
    }
    async delete(id) {
        const doc = await data.delete(id)
        return doc
    }
    async set(uid, id) {
        const doc = await this.findAndDo(uid, id)
        if (doc._id) {
            if (doc.status == 'Public') {
                const doc1 = await data.update({ _id: doc._id }, { status: 'Private' })
                return doc1
            }
            if (doc.status == 'Private') {
                const doc1 = await data.update({ _id: doc._id }, { status: 'Public' })
                return doc1
            }
        }
    }
}
export default PhotoServices
