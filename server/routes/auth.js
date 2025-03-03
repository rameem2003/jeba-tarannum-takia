const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware");
const router = require("express").Router();

// http://localhost:5000/api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let existUser = await db.query("SELECT * FROM `users` WHERE email = ?", [
    email,
  ]);

  if (existUser[0].length > 0) {
    return res.status(404).send({
      success: false,
      msg: "User Already Exist",
    });
  }

  if (name && email && password) {
    try {
      bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.

        if (err) {
          return res.status(500).send({
            success: false,
            msg: "internal Server Error",
            err,
          });
        } else {
          const user = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hash]
          );

          return res.status(201).send({
            success: true,
            msg: "New Account Created Success",
            user,
          });
        }
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: "internal Server Error",
        error,
      });
    }
  } else {
    return res.status(404).send({
      success: false,
      msg: "Pls fill up all fiels",
    });
  }
});

// http://localhost:5000/api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    let existUser = await db.query("SELECT * FROM `users` WHERE email = ?", [
      email,
    ]);

    if (existUser[0].length == 0) {
      return res.status(404).send({
        success: false,
        msg: "Admin Not Found",
      });
    }

    bcrypt.compare(password, existUser[0][0].password, function (err, result) {
      // result == true
      if (err) {
        return res.status(500).send({
          success: false,
          msg: "internal Server Error",
          err,
        });
      } else {
        if (result) {
          let user = {
            id: existUser[0][0].id,
            name: existUser[0][0].name,
            email: existUser[0][0].email,
          };

          let token = jwt.sign(user, process.env.jwt_secret, {
            expiresIn: "1d",
          });

          res.cookie("token", token, {
            // httpOnly: true,
            secure: false,
          });
          return res.status(200).send({
            success: true,
            msg: "Admin Login Successfully",
            user: user,
            token,
          });
        } else {
          return res.status(400).send({
            success: false,
            msg: "Invalid Credentials",
          });
        }
      }
    });
  } else {
    return res.status(500).send({
      success: false,
      msg: "Please Fill Up All Fields",
    });
  }
});

router.get("/verify", checkAdminMiddleware, (req, res) => {
  res.status(200).send({
    success: true,
    msg: "Verified",
  });
});

module.exports = router;
