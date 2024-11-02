const router = require('express').Router();
const categoryController = require('../controllers/category-controller');

router.post('/create', categoryController.createCategory); //protector route
router.get('/', categoryController.gettAllCategories);
router.get('/random', categoryController.getRandomCategories);

module.exports = router;