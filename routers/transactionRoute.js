const authenticate = require("../authenticate");
const {
  create,
  getAll,
  getSingleTransaction,
  update,
  remove,
} = require("../controllers/transactionController");

const router = require("express").Router();

router.get("/", authenticate, getAll);

router.post("/", authenticate, create);

router.get("/:tansactionId", authenticate, getSingleTransaction);

router.put("/:transactionId", authenticate, update);

router.delete("/:transactionId", authenticate, remove);

module.exports = router;
