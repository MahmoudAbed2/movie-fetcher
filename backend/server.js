import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movies.js';
import keyRoutes from './routes/keys.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 8080;
global.user = null;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/keys', keyRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});