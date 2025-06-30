import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import githubRoutes from './src/api/github.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'your-production-domain.com' 
    : 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// API routes
app.use('/api/github', githubRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 