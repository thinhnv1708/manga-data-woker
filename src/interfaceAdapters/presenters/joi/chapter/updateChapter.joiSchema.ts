import { IUpdatePagesInChapterInput } from '@core/dtos/abstracts/chapter';
import * as Joi from 'joi';
import { savePageJoiSchema } from './savePage.joiSchema';

export const updatePagesInChapterJoiSchema =
  Joi.object<IUpdatePagesInChapterInput>({
    path: Joi.string().required(),
    pages: Joi.array().items(savePageJoiSchema).required(),
  });
