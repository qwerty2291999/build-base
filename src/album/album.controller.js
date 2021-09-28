import { create, update } from './album.validation.js'
import AlbumServices from './album.services.js'
import PhotoServices from '../photos/photos.services.js'
import UserAlbumServices from '../userAlbum/userAlbum.services.js'
import ERROR from '../../errors/errors.js'
import HTTP_CODE from 'http-status-codes'

const albumService = new AlbumServices()
const photoService = new PhotoServices()
const userAlbumService = new UserAlbumServices()
const err = new ERROR()

export const test = async function (req, res, next) {
    res.json('abc')
}
export const createAlbum = async function (req, res, next) {
    const data = req.body
    const userId = req.userId
    data.owner = userId
    const validate = create.validate(data)
    if (validate.error) {
        validate.error.code = HTTP_CODE.BAD_REQUEST
        next(validate.error)
    }
    const doc = await albumService.create(data)
    const doc1 = await userAlbumService.create({ userId, albumId: doc._id })
    res.json(doc1)
}
export const myAlbum = async function (req, res, next) {
    const userId = req.userId
    const docs = await userAlbumService.findMine({ userId })
    res.json(docs)
}
export const myAlbumDetails = async function (req, res, next) {
    const id = req.params.id
    const docs = await photoService.findAlbum({ albumId: id })
    res.json(docs)
}
export const allPublic = async function (req, res, next) {
    const docs = await albumService.find()
    res.json(docs)
}
export const addPhoto = async function (req, res, next) {
    const id = req.params.id
    const doc = await albumService.findOne({ _id: id })
    if (doc.code) {
        next(doc)
    } else {
        const photoId = req.body.photoId
        const userId = req.userId
        const doc1 = await photoService.findAndDo(userId, { _id: photoId })
        if (doc1.code) {
            next(doc1)
        } else {
            const doc2 = await photoService.update({ _id: doc1._id }, { updatedAt: Date.now(), albumId: doc._id })
            res.json(doc2)
        }
    }
}
export const removePhoto = async function (req, res, next) {
    const photoId = req.body.photoId
    const userId = req.userId
    const doc = await photoService.findOne({ userId }, { _id: photoId })
    if (doc.code) {
        next(doc)
    } else {
        const doc1 = await photoService.update({ _id: doc._id }, { updatedAt: Date.now(), albumId: '' })
        res.json(doc1)
    }
}
export const joinAlbum = async function (req, res, next) {
    const userId = req.userId
    const albumId = req.params.id
    const doc123 = await userAlbumService.findOne({ userId, albumId })
    if (!doc123) {
        const doc = await userAlbumService.create({ userId, albumId })
        const doc1 = await albumService.findOne({ _id: doc.albumId })
        const doc2 = await albumService.create({ name: doc1.name, description: doc1.description })
        res.json(doc2)
    } else {
        next(err.duplicateValue(albumId))
    }
}
export const updateAlbum = async function (req, res, next) {
    const userId = req.userId
    const albumId = req.params.id
    const data = req.body
    data.updatedAt = Date.now()
    const validate = update.validate(data)
    if (validate.error) {
        throw validate.error
    }
    const doc = await userAlbumService.find({ userId, albumId })
    const doc1 = await albumService.updateOne({ _id: doc.albumId }, data)
    res.json(doc1)
}
export const deleteAlbum = async function (req, res, next) {
    const userId = req.userId
    const albumId = req.params.id
    const permission = await albumService.findOwner(userId, { _id: albumId })
    if (permission.code) {
        next(permission)
    } else {
        const doc = await userAlbumService.find({ userId, albumId })
        if (!doc) {
            next(err.notFoundValue())
        } else {
            const doc1 = await albumService.delete({ _id: doc.albumId })
            const doc2 = await userAlbumService.delete({ albumId })
            res.json(doc2)
        }
    }
}
export const set = async function (req, res, next) {
    const userId = req.userId
    const albumId = req.body.id
    const permission = await albumService.findOwner(userId, { _id: albumId })
    if (permission.message) {
        next(permission)
    } else {
        const doc = await albumService.set(permission)
        res.json(doc)
    }
}
