import { ISaveGenreInput } from '@core/dtos/abstracts/genre';
import * as Joi from 'joi';

export const saveGenreJoiSchema = Joi.object<ISaveGenreInput>({
  title: Joi.string().allow(null, ''),
  path: Joi.string().required(),
});
