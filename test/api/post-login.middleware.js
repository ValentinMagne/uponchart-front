module.exports = (req, res, next) => {
  if (req.path === "/login") {
    req.method = 'GET';
  }
  next();
}
