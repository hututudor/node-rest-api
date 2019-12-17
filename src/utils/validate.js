const Yup = require('yup');

module.exports = async (res, obj, schema) => {
  try {
    await Yup.object()
      .shape(schema)
      .validate(obj);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
