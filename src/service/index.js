const env = require("../utils/environment");
const httpClient = require("../utils/httpClient");

const signinWithLightspeed = async (req, res) => {
  const oauthUrl = `https://cloud.lightspeedapp.com/oauth/authorize.php?response_type=code&client_id=${env.lightSpeed.clientId}&scope=employee:all`;
  res.redirect(oauthUrl);
};

const lightspeedCallback = async (req, res) => {
  const token = await getToken(req.query.code);
  const accessToken = token.access_token;
  const accountInfo = await getAccountInfo(accessToken) 
  //console.log(accountInfo)
  res.send(accountInfo)
};

const getAccountInfo = async (accessToken) => {
  const accountUrl = `https://api.lightspeedapp.com/API/Account.json`; 
  const account = await httpClient.getData(accountUrl, `Bearer ${accessToken}`) 
  return account.data
};

const getToken = async (code) => {
  const accessTokenUrl = `https://cloud.lightspeedapp.com/oauth/access_token.php`;
  const body = {
    client_id: env.lightSpeed.clientId,
    client_secret: env.lightSpeed.clientSecret,
    code,
    grant_type: "authorization_code",
  };

  const response = await httpClient.postData(accessTokenUrl, body);
  return response.data;
};

const test = async (req, res) => {
  res.send({ message: "API working..." });
};

module.exports = { signinWithLightspeed, test, lightspeedCallback };
