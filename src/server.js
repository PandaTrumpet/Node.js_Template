import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
const app = express();
const PORT = Number(env('PORT', 3000));

export const startServer = () => {
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Hello  world' });
  });

  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Route not found!',
  //   });
  // });
  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong!',
  //     error: err.message,
  //   });
  // });
  app.use('*', notFoundHandler);

  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
  });
};
