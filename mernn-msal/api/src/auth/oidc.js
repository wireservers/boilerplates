// src/auth/oidc.js
const axios = require("axios");
const jwksRsa = require("jwks-rsa");
const jwt = require("jsonwebtoken");

let jwksClient;
let issuer;

async function loadDiscovery() {
  const authority = process.env.OIDC_AUTHORITY;
  const url = `${authority}/.well-known/openid-configuration`;
  const { data } = await axios.get(url, { timeout: 10000 });
  issuer = data.issuer;
  jwksClient = jwksRsa({
    jwksUri: data.jwks_uri,
    cache: true,
    rateLimit: true,
  });
  if (!issuer || !jwksClient) throw new Error("OIDC discovery failed");
  console.log("[OIDC] issuer:", issuer);
}

function getKey(header, callback) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

function authenticateJwt(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing bearer token" });

  jwt.verify(
    token,
    getKey,
    {
      algorithms: ["RS256"],
      audience: process.env.API_AUDIENCE,
      issuer,
    },
    (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ error: "Invalid token", detail: err.message });
      req.user = decoded;
      next();
    }
  );
}

module.exports = { loadDiscovery, authenticateJwt };
