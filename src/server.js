import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});