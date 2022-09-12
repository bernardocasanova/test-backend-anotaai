import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required.'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
    },
    price: {
      type: Number,
      min: [1, 'Product price must be at least 1.'],
      required: [true, 'Product price is required.'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required.'],
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;
