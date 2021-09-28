import userAlbumData from './userAlbum.data.js'
const data = new userAlbumData()
class UserAlbumServices {
    async create(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async findOne(obj) {
        const doc = await data.findOne(obj)
        return doc
    }
    async findMine(id) {
        const docs = await data.findMine(id)
        return docs
    }
    async find(any) {
        const doc = await data.find(any)
        return doc
    }
    async delete(id) {
        const doc = await data.delete(id)
        return doc
    }
}
export default UserAlbumServices
