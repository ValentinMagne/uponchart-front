module.exports = (req, res, next) => {
  if (req.path === "/login" || req.path === "/register") {
    req.method = 'GET';
  }
  next();
}
