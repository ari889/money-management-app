const User = require("../model/User");
const registerValidator = require("../validator/registerValidator");
const loginValidator = require("../validator/loginValidator");
const bcrypt = require("bcryptjs");
const { serverError, resourceError } = require("../util/error");
const jwt = require("jsonwebtoken");

/**
 * login controller
 */
module.exports = {
  login(req, res) {
    let { email, password } = req.body;
    let validate = loginValidator({ email, password });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    }

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return resourceError(res, "User not found!");
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return serverError(res, err);
          }

          if (!result) {
            return resourceError(res, "Password doesn't match!");
          }

          let token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
            },
            "SECRET",
            { expiresIn: "2h" }
          );

          res.status(201).json({
            message: "Login successful!",
            token: `Bearer ${token}`,
          });
        });
      })
      .catch((error) => serverError(res, error));
  },
  register(req, res) {
    let { name, email, password, confirmPassword } = req.body;
    let validate = registerValidator({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validate.isValid) {
      res.status(400).json(validate.error);
    } else {
      User.findOne({ email })
        .then((user) => {
          if (user) {
            return resourceError(res, "Email already exists!");
          } else {
            bcrypt.hash(password, 11, (err, hash) => {
              if (err) {
                return resourceError(res, "Server error!");
              } else {
                let user = new User({
                  name,
                  email,
                  password: hash,
                });

                user
                  .save()
                  .then((user) => {
                    res.status(201).json({
                      message: "User created successfully!",
                      user,
                    });
                  })
                  .catch((error) => serverError(res, error));
              }
            });
          }
        })
        .catch((error) => serverError(res, error));
    }
  },
};
