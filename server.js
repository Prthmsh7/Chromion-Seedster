import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import githubRoutes from './src/api/github.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
  origin: [
    'https://chromion-seedster.vercel.app',
    'http://localhost:5173', // Keep local development
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// API routes
app.use('/api/github', githubRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 