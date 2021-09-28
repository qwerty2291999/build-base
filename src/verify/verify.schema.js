import Mongoose from 'mongoose'
export const STATUS = {
    TRUE: 'Verified',
    FALSE: 'Need to verify'
}
const VerifySchema = Mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    expiredAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.FALSE
    }
})
export default Mongoose.model('verify', VerifySchema)
