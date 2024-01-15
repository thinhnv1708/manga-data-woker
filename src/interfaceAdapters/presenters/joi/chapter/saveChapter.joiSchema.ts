import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import * as Joi from 'joi';

export const saveChapterJoiSchema = Joi.object<ISaveChapterInput>({
  mangaSource: Joi.string().required(),
  source: Joi.string().required(),
  order: Joi.number().min(0).required(),
  extraData: Joi.array().items(Joi.string()).required(),
});
