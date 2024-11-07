const router = require("express").Router();
const orderController = require("../controllers/order-controller");
const {
  verifyTokenAndAuthorization,
} = require("../middleware/verification-token");

router.post("/", verifyTokenAndAuthorization, orderController.placeOrder);

router.get("/", verifyTokenAndAuthorization, orderController.getUserOrders);

module.exports = router;
