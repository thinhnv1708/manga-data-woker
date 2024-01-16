import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import * as Joi from 'joi';

export const saveMangaJoiSchema = Joi.object<ISaveMangaInput>({
  path: Joi.string().required(),
  title: Joi.string().allow(null, ''),
  subTitle: Joi.string().allow(null, ''),
  thumbnail: Joi.string().allow(null, ''),
  description: Joi.string().allow(null, ''),
  totalChapter: Joi.number().allow(null, ''),
  genrePaths: Joi.array().items(Joi.string()).allow(null, ''),
  status: Joi.string().allow(null, ''),
});
