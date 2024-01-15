import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import * as Joi from 'joi';

export const saveMangaJoiSchema = Joi.object<ISaveMangaInput>({
  path: Joi.string().required(),
  title: Joi.string().allow(''),
  subTitle: Joi.string().allow(''),
  thumbnail: Joi.string().allow(''),
  description: Joi.string().allow(''),
  totalChapter: Joi.number(),
  genrePaths: Joi.array().items(Joi.string()),
  status: Joi.string().allow(''),
});
