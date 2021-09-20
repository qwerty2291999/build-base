import * as HTMLCODE from 'http-status-codes'

export const login = async function (req, res, next) {
    console.log(req.body)
    res.status(HTMLCODE.StatusCodes.ACCEPTED).send({ message: 'login' })
}
export const register = async function (req, res, next) {
    console.log(req.body)
    res.status(HTMLCODE.StatusCodes.ACCEPTED).send({ message: 'register' })
}
