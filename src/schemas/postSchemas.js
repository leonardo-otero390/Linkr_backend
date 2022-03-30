import joi from 'joi';

export const newPost = joi.object({
  text: joi.string().min(0),
  link: joi.string().uri().required()});
