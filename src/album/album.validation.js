import Joi from 'joi'
export const create = Joi.object({
    owner: Joi.string().min(5).max(100).required(),
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(10).max(500)
})
export const update = Joi.object({
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(10).max(500),
    updatedAt: Joi.date()
})
