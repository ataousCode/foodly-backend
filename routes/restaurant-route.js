const router = require("express").Router();
const restaurantController = require("../controllers/restaurant-controller");

router.post("/create", restaurantController.addRestaurant);
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurntById);
router.get("/random/:code", restaurantController.getRandomRestaurants);
router.get("/all/:code", restaurantController.getAllNearbyRestaurants);

module.exports = router;
