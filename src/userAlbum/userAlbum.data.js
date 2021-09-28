import userAlbumSchema from './userAlbum.schema.js'
class userAlbumData{
    async create(obj){
       const doc = await userAlbumSchema.create(obj)
       return doc
    }
    async findMine(id){
        const doc = await userAlbumSchema.find(id)
        return doc
    }
    async find(any){
        const doc = await userAlbumSchema.findOne(any)
        return doc
    }
    async delete(id){
        const doc = await userAlbumSchema.deleteOne(id)
        return doc
    }
    async findOne(obj){
        const doc = await userAlbumSchema.find(obj)
        return doc
    }
}
export default userAlbumData