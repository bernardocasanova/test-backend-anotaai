import Category from '../models/Category';
import Product from '../models/Product';

class CategoryController {
  async index(req, res) {
    const categories = await Category.find();
    return res.json(categories);
  }

  async store(req, res) {
    try {
      const category = await Category.create(req.body);
      return res.json(category);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
        return res.status(400).send({ errors });
      }
      return res.status(500).send('Something went wrong');
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID.'],
        });
      }

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          errors: ['Category ID is invalid.'],
        });
      }

      const category = await Category.findById(id);

      if (!category) {
        return res.status(400).json({
          errors: ['Category not exist.'],
        });
      }

      return res.json(category);
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID.'],
        });
      }

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          errors: ['Category ID is invalid.'],
        });
      }

      const category = await Category.findById(id);

      if (!category) {
        return res.status(400).json({
          errors: ['Category not exist.'],
        });
      }

      await category.updateOne(req.body);
      return res.json('Category updated.');
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID.'],
        });
      }

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          errors: ['Category ID is invalid.'],
        });
      }

      const category = await Category.findById(id);

      if (!category) {
        return res.status(400).json({
          errors: ['Category not exist.'],
        });
      }

      const products = await Product.find({ category: id });

      if (products.length > 0) {
        return res.status(400).json({
          errors: ['This category cannot be deleted because has products attached.'],
        });
      }

      await category.remove();
      return res.json('Category deleted.');
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new CategoryController();
