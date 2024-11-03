const router = require("express").Router();
const addressController = require("../controllers/address-controller");
const {
  verifyTokenAndAuthorization,
} = require("../middleware/verification-token");

router.post("/", verifyTokenAndAuthorization, addressController.addAddress);
router.get(
  "/default",
  verifyTokenAndAuthorization,
  addressController.getDefaultAddress
);
router.get("/", verifyTokenAndAuthorization, addressController.getAddresses);
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  addressController.deleteAddress
);
router.patch(
  "/default/:id",
  verifyTokenAndAuthorization,
  addressController.setAddressDefault
);

module.exports = router;
