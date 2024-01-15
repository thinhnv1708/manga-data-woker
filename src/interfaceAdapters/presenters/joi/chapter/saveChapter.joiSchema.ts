import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import * as Joi from 'joi';

export const saveChapterJoiSchema = Joi.object<ISaveChapterInput>({
  mangaPath: Joi.string().allow(''),
  path: Joi.string().required(),
  order: Joi.number().min(0),
  extraData: Joi.array().items(Joi.string()),
});
