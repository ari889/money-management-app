const router = require("express").Router();
const { login, register, allUser } = require("../controllers/userController");

/**
 * register route
 */
router.post("/register", register);

/**
 * login route
 */
router.post("/login", login);

/**
 * get all user
 */
router.get("/all", allUser);

module.exports = router;
