import * as Joi from 'joi';

const chapterJoiSchema = Joi.object({
  position: Joi.number().min(0).required(),
  source: Joi.string().required(),
});

export const createChapterJoiSchema = Joi.object({
  mangaId: Joi.string().required(),
  order: Joi.number().min(0).required(),
  pages: Joi.array().items(chapterJoiSchema).required(),
});
