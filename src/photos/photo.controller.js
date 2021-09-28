import { sliceDot, name } from '../../functions/photo.js'
import PhotoServices from './photos.services.js'
import { page, photoUpdate } from './photos.validation.js'
import ERROR from '../../errors/errors.js'
import HTTP_CODE from 'http-status-codes'
const photoService = new PhotoServices()
const err = new ERROR()
export const photo = async function (req, res, next) {
    res.json('abc')
}
export const uploadOne = async function (req, res, next) {
    if (req.file == undefined) {
        next(err.pleaseSelectaPic())
    } else {
        const userId = req.userId
        const name = req.file.filename
        const link = req.file.path
        const data = { userId, name, link }
        const doc = await photoService.createOne(data)
        res.status(HTTP_CODE.OK).json(doc)
    }
}
export const uploads = async function (req, res, next) {
    if (req.files[0] == undefined) {
        next(err.pleaseSelectaPic())
    } else {
        const userId = req.userId
        const data = req.files.map(file => {
            return { userId, name: file.originalname, link: file.path }
        })
        const doc = await photoService.createMany(data)
        if (doc.length > 0) {
            res.send('Uploaded')
        } else {
            res.send('Failed to upload')
        }
    }
}
export const own = async function (req, res, next) {
    const userId = req.userId
    const docs = await photoService.findOwn({ userId })
    res.json(docs)
}
export const all = async function (req, res, next) {
    let pageNo = req.query.page
    if (pageNo == undefined) {
        pageNo = 1
    }
    const validate = page.validate({ page: pageNo })
    if (validate.error) {
        validate.error.code = HTTP_CODE.BAD_REQUEST
        next(validate.error)
    } else {
        const docs = await photoService.findAll(pageNo)
        res.json(docs)
    }
}
export const one = async function (req, res, next) {
    const id = req.params.id
    const userId = req.userId
    const doc = await photoService.findOne(userId, { _id: id })
    if (doc.message) {
        next(doc)
    } else {
        res.json(doc)
    }
}
export const updatePhoto = async function (req, res, next) {
    const id = req.params.id
    const data = req.body
    const userId = req.userId
    data.updatedAt = Date.now()
    const validate = photoUpdate.validate(data)
    if (validate.error) {
        validate.error.code = HTTP_CODE.NOT_FOUND
        next(validate.error)
    }
    const doc = await photoService.findAndDo(userId, { _id: id })
    if (doc.userId) {
        const nameTail = sliceDot(doc.name)
        if (data.name) {
            data.name = name(data.name + nameTail)
        }
        const doc1 = await photoService.update({ _id: id }, data)
        if (doc1.modifiedCount == 1) {
            res.json(doc)
        }
    }
}
export const setStatus = async function (req, res, next) {
    const id = req.params.id
    const userId = req.userId
    const doc = await photoService.findAndDo(userId, { _id: id })
    if (doc.message) {
        next(doc)
    } else {
        const doc1 = await photoService.set(userId, { _id: doc._id })
        res.status(HTTP_CODE.OK).json(doc1)
    }
}
export const deletePhoto = async function (req, res, next) {
    const id = req.params.id
    const userId = req.userId
    const doc = await photoService.findAndDo(userId, { _id: id })
    if (doc.message) {
        next(doc)
    } else {
        const doc1 = await photoService.delete({ _id: doc._id })
        res.status(HTTP_CODE.OK).json(doc1)
    }
}
