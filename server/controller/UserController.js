const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const uuid = require('uuid-js')
const UserModel = require('../models/UserModel')

const Joi = require('joi')
const md5 = crypto.createHash('md5')

// 定义验证逻辑
const LoginSchema = Joi.object().keys({
  password: Joi.string().required(),
  accout: Joi.string().required()
})

const RegisterSchema = LoginSchema.keys({
  type: Joi.number().required()
})

const Login = async function (ctx, next) {
  const { error } = Joi.validate(ctx.request.body, LoginSchema)
  ctx.assert(!error, 400, error.details[0].message)
  const password = ctx.request.body.password
  const secretPw = md5.update(password).digest('hex')
  const user = await UserModel.findUser({ ...ctx.request.body, password: secretPw })
  ctx.assert(user, 400, 'accout wrong')
  ctx.body = jwt.sign({ uid: user.uuid }, require('../config').token_cert)
  next()
}

const Register = async function (ctx, next) {
  const { error } = Joi.validate(ctx.request.body, RegisterSchema)
  ctx.assert(!error, 400, error.details[0].message)
  const password = ctx.request.body.password
  const user = {
    uuid: uuid.create(),
    accout: ctx.request.body.accout,
    type: ctx.request.body.type,
    password: md5.update(password).digest('hex')
  }
  await UserModel.createUser(user)
  next()
}

module.exports = {
  Login,
  Register
}
