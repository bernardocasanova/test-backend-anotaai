import fs from 'fs';

// Load Models
import Product from '../models/Product';
import Category from '../models/Category';

// Read The JSON files
const seedProducts = JSON.parse(fs.readFileSync(`${__dirname}/seed/products.json`, 'utf-8'));
const seedCategories = JSON.parse(fs.readFileSync(`${__dirname}/seed/categories.json`, 'utf-8'));

// Populate Sample Data In DB
const populate = async () => {
  try {
    // Populate categories collection
    const categories = await Category.create(seedCategories);

    // Sort randomly categories for each product
    seedProducts.map((product) => {
      product.category = categories[Math.floor(Math.random() * categories.length)].id;
      return product;
    });

    // Populate products collection
    await Product.create(seedProducts);
    console.log('Data successfully imported.');
  } catch (err) {
    console.log(err);
  }
};

const seedDatabase = async (req, res) => {
  try {
    await populate();
    return res.json('Data successfully imported.');
  } catch (err) {
    return res.json('An error occurred during seeding.');
  }
};

export default seedDatabase;
