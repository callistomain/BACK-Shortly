import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import urlsRoutes from './routes/urls.routes.js';
import usersRoutes from './routes/users.routes.js';
import generalRoutes from './routes/general.routes.js';
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(authRoutes);
app.use(urlsRoutes);
app.use(usersRoutes);
app.use(generalRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});