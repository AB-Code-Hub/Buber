import joi from "joi";

export const registerUserValidation = (validator) => {
  const registerUserValidationSchema = joi.object({
    fullName: joi
      .object({
        firstName: joi.string().min(3).required(),
        lastName: joi.string().min(3),
      })
      .required(),

    email: joi.string().required().min(6),
    password: joi.string().required().min(6),
  });

  return registerUserValidationSchema.validate(validator)
};
