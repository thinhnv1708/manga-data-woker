import * as Joi from 'joi';

export const createGenreJoiSchema = Joi.object({
  title: Joi.string().required(),
});
