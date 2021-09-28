import express from 'express'
import { Auth } from '../auth/auth.middlware.js'
import { upload } from '../../functions/photo.js'
import { photo, uploads, own, all, one, updatePhoto, setStatus, deletePhoto, uploadOne } from './photo.controller.js'

const app = express()
app.use(express())

app.get('/photo', Auth, photo)
app.post('/photo/upload', Auth, upload.single('photo'), uploadOne)
app.post('/photo/uploads', Auth, upload.array('photos'), uploads)
app.get('/photo/own', Auth, own)
app.get('/photo/all', Auth, all)
app.get('/photo/:id', Auth, one)
app.post('/photo/update/:id', Auth, updatePhoto)
app.post('/photo/set/:id', Auth, setStatus)
app.post('/photo/delete/:id', Auth, deletePhoto)

export default app
