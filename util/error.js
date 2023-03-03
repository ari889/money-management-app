module.exports = {
  serverError(res, error) {
    console.log(error);
    res.status(500).json({
      message: "Server error occured!",
    });
  },
  resourceError(res, message) {
    res.status(400).json({
      message,
    });
  },
};
