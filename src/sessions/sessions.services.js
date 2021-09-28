import SessionsData from './sessions.data.js'
import { expiredHrs } from '../../functions/time.js'
const data = new SessionsData()
class SessionServices {
    async findOne(obj) {
        const doc = await data.findOne(obj)
        return doc
    }
    async create(obj) {
        obj.expiresAt = expiredHrs(3)
        await data.create(obj)
    }
    async destroy(id) {
        await data.destroy(id)
    }
    async updateOne(id, key) {
        await data.updateOne(id, key)
    }
    async findExpired() {
        const docs = await data.findAll()
        const filter = docs.filter(doc => {
            return new Date(doc.expiresAt).getTime() < Date.now()
        })
        return filter
    }
}
export default SessionServices
