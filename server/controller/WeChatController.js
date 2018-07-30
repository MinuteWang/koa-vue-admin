const wx_config = require('../config/wx_config');
const axios = require('axios');
const Joi = require('joi');

const wxAuth = async (ctx, next) => {
  ctx.redirect(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      wx_config.appid
    }&redirect_uri=${escape(ctx.query.callback)}&response_type=${
      wx_config.response_type
    }&scope=${wx_config.scope}&state=STATE#wechat_redirect`
  );
  next();
};

const wxLoginSchema = Joi.object().keys({
  code: Joi.required()
});
const wxLogin = async (ctx, next) => {
  const { error } = Joi.validate(ctx.request.body, wxLoginSchema);
  ctx.assert(!error, 400, error && error.details[0].message);
  const result = await axios.get(
    'https://api.weixin.qq.com/sns/oauth2/access_token',
    {
      params: {
        appid: wx_config.appid,
        secret: wx_config.appsecret,
        code: ctx.request.body.code,
        grant_type: 'authorization_code'
      }
    }
  );
  ctx.body.data = result.data;
  next();
};

const wxTestSchema = Joi.object().keys({
  signature: Joi.required(),
  timestamp: Joi.required(),
  nonce: Joi.required()
});
const wxTest = async function(ctx, next) {
  const { error } = Joi.validate(ctx.query, wxTestSchema);
  ctx.assert(!error, 400, error && error.details[0].message);
  const token = 'wx_wangmingli', // 自定义，与公众号设置的一致
    signature = ctx.query.signature,
    timestamp = ctx.query.timestamp,
    nonce = ctx.query.nonce;
  const arr = [token, timestamp, nonce].sort();
  const sha1 = require('crypto').createHash('sha1');
  sha1.update(arr.join(''));
  const result = sha1.digest('hex');
  if (result === signature) {
    ctx.body.data = ctx.query.echostr;
  } else {
    ctx.body.code = 405;
    ctx.body.message = 'fail';
  }
  next();
};

module.exports = {
  wxAuth,
  wxLogin,
  wxTest
};
