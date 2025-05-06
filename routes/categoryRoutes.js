const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryController');

router.post('/create', createCategory);

router.get('/', getCategories);

module.exports = router;
