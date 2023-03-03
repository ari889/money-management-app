const User = require("../model/User");
const registerValidator = require("../validator/registerValidator");
const bcrypt = require("bcryptjs");

/**
 * login controller
 */
module.exports = {
  login(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    res.json({
      message: `Welcome ${name}, we will contact with you by ${email}`,
    });
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
            res.status(400).json({
              message: "Email already exists!",
            });
          } else {
            bcrypt.hash(password, 11, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  message: "server error occured",
                });
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
                  .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                      message: "Server error occured!",
                    });
                  });
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "Server error occured!",
          });
        });
    }
  },
};
