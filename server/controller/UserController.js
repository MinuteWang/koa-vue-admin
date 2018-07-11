const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const Login = async function (ctx, next) {
  const md5 = crypto.createHash('md5')
  const password = ctx.request.body.password
  const secretPw = md5.update(password).digest('hex')
  const user = await UserModel.findUser({...ctx.request.body, password: secretPw})
  ctx.assert(user, 400, 'accout wrong')
  ctx.body = jwt.sign({uid: user.uuid}, require('../config').token_cert)
  next()
}

const Register = async function (ctx, next) {

}

module.exports = {
  Login
}
