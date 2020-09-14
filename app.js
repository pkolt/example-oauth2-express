var express = require('express');
var bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
var oauthModel = require('./model');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add OAuth server.
app.oauth = new OAuth2Server({
  model: oauthModel,
});

const token = async (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);
  try {
    const token = await app.oauth.token(request, response);
    res.json(token);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

const authenticate = async (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  try {
    await app.oauth.authenticate(request, response);
    next();
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

// Post token.
app.post('/oauth/token', token);

// Get secret.
app.get('/secret', authenticate, function (req, res) {
  // Will require a valid access_token.
  res.send('Secret area');
});

app.get('/public', function (req, res) {
  // Does not require an access_token.
  res.send('Public area');
});

app.listen(3000);
