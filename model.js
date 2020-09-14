const client = {
  id: "id",
  secret: "secret",
  grants: ["password", "refresh_token"],
};

const users = [
  {
    username: "user",
    password: "password",
  },
];

let tokens = [];

const getAccessToken = (token) => {
  return tokens.find((savedToken) => savedToken.accessToken === token);
};

const getClient = (clientId, clientSecret) => {
  const { id, secret, grants } = client;
  if (clientId === id && clientSecret === secret) {
    return { id, clientId, grants };
  }
};

const saveToken = (token, client, user) => {
  const savedToken = {
    ...token,
    client: { id: client.clientId },
    user: { username: user.username },
  };
  tokens.push(savedToken);
  return savedToken;
};

const getUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};

const getRefreshToken = (refreshToken) => {
  return tokens.find((savedToken) => savedToken.refreshToken === refreshToken);
};

const revokeToken = (token) => {
  tokens = tokens.filter(
    (savedToken) => savedToken.refreshToken !== token.refreshToken
  );
  const revokedTokensFound = tokens.filter(
    (savedToken) => savedToken.refreshToken === token.refreshToken
  );
  return !revokedTokensFound.length;
};

module.exports = {
  getAccessToken,
  getClient,
  saveToken,
  getUser,
  getRefreshToken,
  revokeToken,
};
