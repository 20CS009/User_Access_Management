const express = require('express');
const { AppDataSource } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const softwareRoutes = require('./routes/softwareRoutes');
const requestRoutes = require('./routes/requestRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log('Database connection error:', error));