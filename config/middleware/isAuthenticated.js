module.exports = function(req, res, next) {
  if (req.user) {
    return next();
  }
  console.log(req.user)
  return res.redirect("/");
};
