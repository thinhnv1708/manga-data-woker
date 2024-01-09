import { IUpdateChapterInput } from '@core/dtos/abstracts/chapter';
import * as Joi from 'joi';
import { savePageJoiSchema } from './savePage.joiSchema';

export const updateChapterJoiSchema = Joi.object<IUpdateChapterInput>({
  source: Joi.string().required(),
  pages: Joi.array().items(savePageJoiSchema).required(),
});
