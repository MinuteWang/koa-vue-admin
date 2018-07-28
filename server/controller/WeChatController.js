const wx_config = require('../config/wx_config');
const axios = require('axios');
const wxAuth = async (ctx, next) => {
  ctx.redirect(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      wx_config.appid
    }&redirect_uri=${ctx.query.callback}&response_type=${encodeURI(
      wx_config.response_type
    )}&scope=${wx_config.scope}&state=STATE#wechat_redirect`
  );
  next();
};

const wxLogin = async (ctx, next) => {
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

module.exports = {
  wxAuth,
  wxLogin
};
