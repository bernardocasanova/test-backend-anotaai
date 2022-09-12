import mongoose from 'mongoose';
import app from './app';

const {
  DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, APP_PORT,
} = process.env;

mongoose
  .connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    {
      useNewUrlParser: true,
    },
  )
  .then(() => { app.emit('mongodb'); })
  .catch((e) => console.log(e));

app.on('mongodb', () => {
  app.listen(APP_PORT, () => {
    console.log(`Connected, listening on port ${APP_PORT}`);
  });
});
