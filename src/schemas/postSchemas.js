import joi from 'joi';

export const newPost = joi.object({
  text: joi.string().required(),
  link: joi.string().uri().required()});
