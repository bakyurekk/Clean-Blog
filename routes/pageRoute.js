const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/about', pageController.getAboutPage);
router.get('/post', pageController.getAddPostPage);
router.get('/add-post', pageController.getAddPostPage);
router.get('/posts/edit/:id', pageController.getEditPage);

module.exports = router;
