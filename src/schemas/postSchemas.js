import joi from 'joi';

export const newPost = joi.object({
  text: joi.string(),
  link: joi.string().uri().required()});
