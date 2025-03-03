const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const checkAdminMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  // if token found
  if (token) {
    // token verify
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      // if error
      if (err) {
        res.status(400).send({
          success: false,
          msg: "Invalid Token",
        });
      } else {
        // if decoded and user role is matched to admin
        const existAdmin = await db.query(
          "SELECT * FROM `users` WHERE email = ?",
          [decoded.email]
        );

        if (existAdmin) {
          next();
        } else {
          res.status(401).send({
            success: false,
            msg: "Admin Not Found",
          });
        }
      }
    });
  }
  // if token not found
  else {
    res.status(400).send({
      success: false,
      msg: "Admin Token Not Found, Please Login Again As An Admin",
    });
  }
};

module.exports = checkAdminMiddleware;
