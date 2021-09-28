import express from 'express'
import { Auth } from '../auth/auth.middlware.js'
import {
    test,
    myAlbumDetails,
    allPublic,
    addPhoto,
    removePhoto,
    joinAlbum,
    updateAlbum,
    deleteAlbum,
    createAlbum,
    myAlbum,
    set
} from './album.controller.js'

const app = express()
app.use(express())
app.get('/album', Auth, test)
app.post('/album/create', Auth, createAlbum)
app.get('/album/myalbum', Auth, myAlbum)
app.get('/album/myalbum/:id', Auth, myAlbumDetails)
app.get('/album/all', Auth, allPublic)
app.post('/album/add/:id', Auth, addPhoto)
app.post('/album/remove', Auth, removePhoto)
app.post('/album/join/:id', Auth, joinAlbum)
app.post('/album/update/:id', Auth, updateAlbum)
app.post('/album/delete/:id', Auth, deleteAlbum)
app.post('/album/set', Auth, set)

export default app
