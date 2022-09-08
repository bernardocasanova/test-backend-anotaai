import mongoose from 'mongoose';
import app from './app';

const {
  DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, SERVER_PORT,
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
  app.listen(SERVER_PORT, () => {
    console.log(`Connected, listening on port ${SERVER_PORT}`);
  });
});
