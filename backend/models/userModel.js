import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    password: Joi.string().alphanum().min(8).required()
});

export default userSchema;