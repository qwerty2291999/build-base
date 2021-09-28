import HTTP_CODE from 'http-status-codes'
import ERROR from '../../errors/errors.js'
import UserServices from './user.services.js'
import { updatePassword, updateInfo } from './user.validation.js'
import { upperFirstLetter } from '../../functions/strings.js'
const service = new UserServices()
const err = new ERROR()
export const me = async function (req, res, next) {
    const userId = req.userId
    const doc = await service.findOne({ _id: userId })
    res.json(doc)
}
export const changePassword = async function (req, res, next) {
    const userId = req.userId
    const data = req.body
    const validate = updatePassword.validate(data)
    if (validate.error) {
        next(validate.error)
    }
    const { repeat_password, ...newData } = data
    const doc = await service.findPassword({ _id: userId, password: newData.password })
    if (doc.message) {
        next(doc)
    } else {
        const doc1 = await service.updateOne({ _id: userId }, { password: newData.password })
        if (doc1.modifiedCount == 1) {
            res.status(HTTP_CODE.OK).json(doc)
        }
    }
}
export const updateInfos = async function (req, res, next) {
    const userId = req.userId
    const data = req.body
    const validate = updateInfo.validate(data)
    if (validate.error) {
        next(validate.error)
    }
    if (data.name) {
        data.name = upperFirstLetter(data.name)
    }
    const doc = await service.updateOne({ _id: userId }, data)
    if (doc.modifiedCount == 1) {
        res.status(HTTP_CODE.OK).json(data)
    }
}
