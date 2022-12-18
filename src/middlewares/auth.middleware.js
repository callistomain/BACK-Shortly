import { signupSchema } from "../models/auth.model.js";

export async function signupSchemaValidation (req, res, next) {
  const data = req.body;
  const {error} = signupSchema.validate(data, {abortEarly: false});
  if (error) {
    const message = error.details.map(e => e.message);
    console.log('Error: ' + message);
    return res.status(422).send(message);
  }

  res.locals.data = data;
  next();
};