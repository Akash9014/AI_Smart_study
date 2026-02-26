const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("DECODED:", decoded);
  req.user = decoded;
  next();
} catch (err) {
  console.log("VERIFY ERROR:", err.message);
  res.status(401).json({ message: "Token is not valid" });
}
  console.log("MIDDLEWARE SECRET:", process.env.JWT_SECRET);
};