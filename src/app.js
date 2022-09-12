import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Application routes
import product from './routes/product';
import category from './routes/category';
import populate from './routes/populate';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extented: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/product/', product);
    this.app.use('/category/', category);
    this.app.use('/populate/', populate);
  }
}

export default new App().app;
