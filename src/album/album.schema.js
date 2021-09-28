import Mongoose from 'mongoose'
export const STATUS = {
    TRUE: 'Public',
    FASLE: 'Private'
}
const AlbumSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    owner: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.FASLE
    }
})
export default Mongoose.model('Album', AlbumSchema)
