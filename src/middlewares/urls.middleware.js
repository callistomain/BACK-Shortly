import { urlSchema } from "../models/urls.model.js";

export async function urlSchemaValidation (req, res, next) {
  const data = req.body;
  const {error} = urlSchema.validate(data, {abortEarly: false});
  if (error) {
    const message = error.details.map(e => e.message);
    console.log('Error: ' + message);
    return res.status(422).send(message);
  }

  data.token = res.locals.token;
  res.locals.data = data;
  next();
};
