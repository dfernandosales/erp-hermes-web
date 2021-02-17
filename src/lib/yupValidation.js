const yupValidation = schema => async data => {
  try {
    const values = await schema.validate(data, { abortEarly: false });
    Object.keys(values).forEach(key => {
      values[key] = undefined;
    });
    return values;
  } catch (err) {
    let errors = err.inner.reduce(
      (formError, innerError) => ({
        ...formError,
        [innerError.path]: innerError.message
      }),
      {}
    );
    return errors;
  }
};

export default yupValidation;
