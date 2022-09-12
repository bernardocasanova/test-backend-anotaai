import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.find().populate('category', 'name');
    return res.json(products);
  }

  async store(req, res) {
    try {
      const product = await Product.create(req.body);
      return res.status(200).json({ product });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });
        return res.status(400).send({ errors });
      }
      return res.status(500).send('Something went wrong.');
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
          errors: ['Product ID is invalid.'],
        });
      }

      const product = await Product.findById(id).populate('category', 'name');

      if (!product) {
        return res.status(400).json({
          errors: ['Product not exist.'],
        });
      }

      return res.json(product);
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
          errors: ['Product ID is invalid.'],
        });
      }

      const product = await Product.findById(id);

      if (!product) {
        return res.status(400).json({
          errors: ['Product not exist.'],
        });
      }

      await product.updateOne(req.body);
      return res.json('Product updated.');
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
          errors: ['Product ID is invalid.'],
        });
      }

      const product = await Product.findById(id);

      if (!product) {
        return res.status(400).json({
          errors: ['Product not exist.'],
        });
      }

      await product.remove();
      return res.json('Product deleted.');
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async filter(req, res) {
    try {
      const parameter = req.query;

      if (Object.keys(parameter).length === 0) {
        return res.status(400).json({
          errors: ['Missing parameter.'],
        });
      }

      if (
        Object.keys(parameter).includes('title')
        || Object.keys(parameter).includes('category')
      ) {
        const filter = Object.keys(parameter).includes('title') ? 'title' : 'category';
        let query;

        if (parameter[filter].length === 0) {
          return res.status(400).json({
            errors: ['Missing parameter value.'],
          });
        }

        if (filter === 'title') {
          query = [{
            $match: {
              $and: [{
                title: {
                  $regex: parameter[filter],
                  $options: 'i',
                },
              }],
            },
          }];
        } if (filter === 'category') {
          query = [{
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          }, {
            $unwind: '$category',
          }, {
            $match: {
              $and: [{
                'category.name': {
                  $regex: parameter[filter],
                  $options: 'i',
                },
              }],
            },
          }];
        }

        const products = await Product.aggregate(query);
        if (products.length > 0) {
          return res.status(200).json({ products });
        }
        return res.status(200).json({
          message: 'No products found with this parameter.',
        });
      }

      return res.status(400).json({
        errors: ['Wrong parameter. The parameter must be title or category.'],
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export default new ProductController();
