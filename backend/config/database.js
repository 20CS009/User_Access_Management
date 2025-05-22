const { DataSource } = require('typeorm');
const { User } = require('../entities/User');
const { Software } = require('../entities/Software');
const { Request } = require('../entities/Request');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'user_access_management',
  entities: [User, Software, Request],
  synchronize: true, // Set to false in production
  logging: false,
});

module.exports = { AppDataSource };