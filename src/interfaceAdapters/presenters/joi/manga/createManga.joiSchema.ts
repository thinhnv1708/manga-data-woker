import * as Joi from 'joi';

export const createMangaJoiSchema = Joi.object({
  title: Joi.string().required(),
  subTitle: Joi.string().required(),
  thumbnail: Joi.string().required(),
  description: Joi.string().required(),
  genres: Joi.array().items(Joi.string()).required(),
  status: Joi.string().required(),
});
