import Joi from 'joi';

const movieSchema = Joi.object({
    title: Joi.string().min(3).required(),
    poster: Joi.string().uri(),
    trailer_link: Joi.string().uri(),
});

export default movieSchema;
