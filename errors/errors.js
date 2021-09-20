import { HTTP_CODE } from './httpCode.js'
class ERROR extends Error {
    constructor(name, message, stack, code) {
        super(name, message, stack)
        this.code = code
    }
    notFoundValue(value) {
        this.message = `Cannot find matched value ${value}`
        this.code = HTTP_CODE.NOT_FOUND
        return this
    }
    duplicateValue(value) {
        this.message = `Duplicate value in database ${value}`
        this.code = HTTP_CODE.NOT_ACCEPTABLE
        return this
    }
    wrongUsernameOrPassword() {
        this.message = 'Wrong username or password'
        this.code = HTTP_CODE.UNAUTHORIZED
        return this
    }
}
export default ERROR
