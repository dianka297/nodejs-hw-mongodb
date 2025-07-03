import createHttpError from 'http-errors';

export const validateBody = (schema) => (req, res, next) => {
  /* validate(…, { abortEarly:false }) → збирає всі помилки
     stripUnknown:true → видаляє з body «зайві» поля, яких немає в схемі */
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    /* Формуємо один рядок зі списком усіх порушень */
    const message = error.details.map((d) => d.message).join(', ');
    return next(createHttpError(400, message));
  }

  /* якщо success — підміняємо body очищеним value */
  req.body = value;
  next();
};

  