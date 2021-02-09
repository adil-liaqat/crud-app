import * as joi from 'joi';
import { convertToArray } from '../helpers';

const customJoi = joi.extend((Joi: joi.Root): any => {
  return ({
    base: Joi.array(),
    type: 'splitter',
    coerce: (value: string) => ({
      value: convertToArray(value),
    }),
  });
})

export const userCreation: joi.Schema = joi.object({
  name: joi.string()
    .required()
    .error(new Error('First name is required.')),

  surname: joi.string()
    .required()
    .error(new Error('surname is required.')),

  email: joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'email should be valid.',
      'string.empty': `email cannot be an empty.`,
      'any.required': 'email is required.',
    }),

  age: joi.number().allow(null, '').max(150),

  gender: joi.string().valid('male', 'female'),

  birthday: joi.date().max(new Date()).allow(null, ''),

  phone: joi.string().allow(null, ''),

  contacts: customJoi.splitter().items(joi.number()).allow(null, ''),

});


export const userUpdate: joi.Schema = joi.object({
  name: joi.string()
    .required()
    .error(new Error('First name is required.')),

  surname: joi.string()
    .required()
    .error(new Error('surname is required.')),

  age: joi.number().allow(null, '').max(150),

  gender: joi.string().valid('male', 'female'),

  birthday: joi.date().max(new Date()).allow(null, ''),

  phone: joi.string().allow(null, ''),

  contacts: customJoi.splitter().items(joi.number()).allow(null, ''),

});
