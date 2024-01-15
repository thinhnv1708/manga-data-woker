import { ISavePageInput } from '@core/dtos/abstracts/chapter';
import * as Joi from 'joi';

export const savePageJoiSchema = Joi.object<ISavePageInput>({
  position: Joi.number().required(),
  path: Joi.string().required(),
});
