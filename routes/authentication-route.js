const router = require("express").Router();
const authenticationController = require("../controllers/authentication-controller");

router.post("/register", authenticationController.createUser);
router.post('/login', authenticationController.login);

module.exports = router;
