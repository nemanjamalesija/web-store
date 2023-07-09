var _a, _b;
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔥  Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
import app from './app.js';
dotenv.config({ path: '../config.env' });
const server = http.createServer(app);
const db =
  (_b =
    (_a = process === null || process === void 0 ? void 0 : process.env) ===
      null || _a === void 0
      ? void 0
      : _a.DATABASE) === null || _b === void 0
    ? void 0
    : _b.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const PORT = process.env.PORT || 6001;
if (!db)
  throw new Error(
    'There has been an error while connecting your password to the database. Could not connect'
  );
mongoose
  .connect(db)
  .then(() => console.log('Database connection is successful'))
  .catch((error) => {
    'There was an error when connecting to the database';
    console.log(error);
  });
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🔥  Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
