const router = require("express").Router();
const restaurantController = require("../controllers/restaurant-controller");

router.post("/create", restaurantController.addRestaurant);
router.get("/:id", restaurantController.getRestaurntById);
router.get("/:code", restaurantController.getRandomRestaurants);
router.get("/all/:code", restaurantController.getAllNearbyRestaurants);

module.exports = router;
