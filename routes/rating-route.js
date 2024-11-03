const router = require("express").Router();
const ratingController = require("../controllers/rating-controller");

router.get("/", ratingController.addRating);
router.get("/", ratingController.checkUserRating); // both required user auth

module.exports = router;
