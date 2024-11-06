const router = require("express").Router();
const cartController = require("../controllers/cart-controller");
const {
  verifyTokenAndAuthorization,
} = require("../middleware/verification-token");

router.post("/", verifyTokenAndAuthorization, cartController.addProductToCart);
router.get(
  "/decrement/:id",
  verifyTokenAndAuthorization,
  cartController.decrementProductQty
);
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  cartController.removeCartItem
);
router.get("/", verifyTokenAndAuthorization, cartController.getCart);
router.get("/count", verifyTokenAndAuthorization, cartController.getCartCount);

module.exports = router;
