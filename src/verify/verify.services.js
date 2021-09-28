import VerifyData from './verify.data.js'
const data = new VerifyData()
class VerifyServices {
    async findAll() {
        const docs = await data.findAll()
        return docs
    }
    async find(email) {
        const doc = await data.find(email)
        if (doc.status == 'Verified') {
            return doc
        } else return 'Verify your email first'
    }
    async findAndUpdate(email, code) {
        const doc = await data.find(email)
        if (doc.code == code) {
            const doc = await data.update(email)
            return doc
        } else {
            return 'Wrong code'
        }
    }
    async findOne(any) {
        const doc = await data.findOne(any)
        return doc
    }
    async updateOne(key, obj) {
        const doc = await data.updateOne(key,obj)
        return doc
    }
    async create(obj) {
        await data.create(obj)
    }
    async delete(email) {
        await data.delete(email)
    }
    async findExprired() {
        const docs = await this.findAll()
        const filter = docs.filter(doc => {
            return new Date(doc.expiredAt).getTime() < Date.now()
        })
        return filter
    }
}
export default VerifyServices
