// src/auth/requireScope.js
function requireScope(required) {
  return (req, res, next) => {
    const scp = req.user && req.user.scp ? req.user.scp.split(" ") : [];
    const hasAll = required.every((r) => scp.includes(r));
    if (!hasAll)
      return res
        .status(403)
        .json({ error: "Insufficient scope", required, have: scp });
    next();
  };
}
module.exports = { requireScope };
