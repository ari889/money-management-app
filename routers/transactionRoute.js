const {
  create,
  getAll,
  getSingleTransaction,
  update,
  remove,
} = require("../controllers/transactionController");

const router = require("express").Router();

router.get("/", getAll);

router.post("/", create);

router.get("/:tansactionId", getSingleTransaction);

router.put("/:transactionId", update);

router.delete("/:transactionId", remove);

module.exports = router;
