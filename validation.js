//Validaiton
const Joi = require("@hapi/joi");
//Register Vaidation
const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

const shoeValidation = data => {
  const schema = {
    title: Joi.string().required(),
    styleId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    price: Joi.number().required(),
    picture: Joi.string().required(),
    pictureTwo: Joi.string().required(),
    gender: Joi.string().required(),
    countInBag: Joi.number().required()
  };
  return Joi.validate(data, schema);
};

const styleValidation = data => {
  const schema = {
    name: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.shoeValidation = shoeValidation;
module.exports.styleValidation = styleValidation;
