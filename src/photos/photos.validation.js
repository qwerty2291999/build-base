import Joi from "joi";
export const photoUpdate = Joi.object({
    status:Joi.string(),
    name:Joi.string()
    .min(3)
    .max(100)
    .pattern(new RegExp('^[a-zA-Z0-9._-]{3,30}$')),
    updatedAt:Joi.date()
})
export const page = Joi.object({
    page:Joi.number()
})