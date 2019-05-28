module.exports = function(req, res, next) {
  if (!req.user.user.isAdmin) return res.status(403).send("Access Denied");
  next();
};
