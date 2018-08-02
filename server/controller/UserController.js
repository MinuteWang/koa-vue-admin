const crypto = require('crypto');
const uuid = require('uuid/v1');
const UserModel = require('../models/UserModel');

const Joi = require('joi');

// 定义验证逻辑
const LoginSchema = Joi.object().keys({
  password: Joi.string().required(),
  accout: Joi.string().required()
});

const RegisterSchema = LoginSchema.keys({
  type: Joi.number().required()
});

const Login = async function(ctx, next) {
  const { error } = Joi.validate(ctx.request.body, LoginSchema);
  ctx.assert(!error, 400, error && error.details[0].message);
  const password = ctx.request.body.password;
  const md5 = crypto.createHash('md5');
  const secretPw = md5.update(password).digest('hex');
  const user = await UserModel.findUser({
    ...ctx.request.body,
    password: secretPw
  });
  ctx.assert(user, 400, 'accout wrong');
  const token = require('../utils/jwtHelper').sign({ uid: user.uuid });
  ctx.memory.create(token, {});
  ctx.body.data = { token };
  next();
};

const Register = async function(ctx, next) {
  const { error } = Joi.validate(ctx.request.body, RegisterSchema);
  ctx.assert(!error, 400, error && error.details[0].message);
  const password = ctx.request.body.password;
  const md5 = crypto.createHash('md5');
  const user = {
    uuid: uuid(),
    accout: ctx.request.body.accout,
    type: ctx.request.body.type,
    password: md5.update(password).digest('hex')
  };
  try {
    await UserModel.createUser(user);
  } catch (err) {
    ctx.throw(400, '该账号已存在');
  }
  next();
};

module.exports = {
  Login,
  Register
};
