const router = require("express").Router();
const userController = require("../controllers/user-controller");
const {
  verifyTokenAndAuthorization,
} = require("../middleware/verification-token");

router.get(
  "/verify/:otp",
  verifyTokenAndAuthorization,
  userController.verifyAccount
);
router.get(
  "/verify_phone/:phone",
  verifyTokenAndAuthorization,
  userController.verifyPhone
);
router.get("/", verifyTokenAndAuthorization, userController.getUser);

module.exports = router;
