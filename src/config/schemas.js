import Joi from "joi";

export const schemasEmail = {
  email: Joi.string().email().required(),
};
