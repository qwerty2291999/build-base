import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../build-base/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, name(file.originalname))
    }
})
export const upload = multer({ storage: storage })

export function name(str) {
    const newStr = 'Photo_' + Math.floor(Math.random() * 1000000000) + '_' + `${str}`
    return newStr
}
export function sliceDot(str) {
    let length = str.length
    let result = 0
    while (length > 0) {
        length--
        if (str.charAt(length) == '.') {
            result = length
            break
        }
    }
    str = str.slice(result)
    return str
}
