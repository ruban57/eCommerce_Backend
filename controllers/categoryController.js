const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name, image });
    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create category' });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};
