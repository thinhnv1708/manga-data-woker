import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import * as Joi from 'joi';

export const saveMangaJoiSchema = Joi.object<ISaveMangaInput>({
  source: Joi.string().required(),
  title: Joi.string().required(),
  subTitle: Joi.string().required(),
  thumbnail: Joi.string().required(),
  description: Joi.string().required(),
  totalChapter: Joi.number().required(),
  genreSources: Joi.string().required(),
  status: Joi.string().required(),
});
