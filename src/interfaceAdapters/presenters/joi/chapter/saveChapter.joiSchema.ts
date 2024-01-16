import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import * as Joi from 'joi';

export const saveChapterJoiSchema = Joi.object<ISaveChapterInput>({
  mangaPath: Joi.string().allow(null),
  path: Joi.string().required(),
  order: Joi.number().min(0).allow(null),
  extraData: Joi.array().items(Joi.string()).allow(null),
});
