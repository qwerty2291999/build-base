import Joi from 'joi'

export const updatePassword = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9._]{3,30}$')).required(),
    repeat_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9._]{3,30}$')).required().valid(Joi.ref('password'))
})
export const updateInfo = Joi.object({
    username: Joi.string().alphanum().min(5).max(100),
    name: Joi.string().min(10).max(100)
})
export const forgot = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .min(5)
        .max(100)
})
