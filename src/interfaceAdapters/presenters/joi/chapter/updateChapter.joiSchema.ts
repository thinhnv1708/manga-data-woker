import { IUpdatePagesInChapterInput } from '@core/dtos/abstracts/chapter';
import * as Joi from 'joi';
import { savePageJoiSchema } from './savePage.joiSchema';

export const updatePagesInChapterJoiSchema =
  Joi.object<IUpdatePagesInChapterInput>({
    chapterPath: Joi.string().required(),
    pages: Joi.array().items(savePageJoiSchema).allow(null, ''),
    status: Joi.string().allow(null, ''),
  });
