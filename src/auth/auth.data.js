import UserData from '../user/user.data.js'
const data = new UserData()
class AuthData {
    async findOne(any) {
        const doc = await data.findOne(any)
        return doc
    }

    async register(obj) {
        const doc = await data.create(obj)
        return doc
    }
}
export default AuthData
