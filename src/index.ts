import express from 'express';
import userRoutes from './routes/userRoutes';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedExercices } from './data/exercices';
import cors from 'cors';

dotenv.config();

seedExercices(); // insère exercices initiaux en base si besoin

const NAMESPACE = 'Index';
const PORT = 4201;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fit4life';

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '4mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

app.use('/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json({ message: error.message });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connexion à MongoDB réussie');

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`${NAMESPACE} ➡️ Server is running on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur MongoDB :', err);
  });
