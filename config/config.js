require('dotenv').config();  // Loads environment variables from .env file

const config = {
  PORT: process.env.PORT || 9000, // Default to 9000 if not set in .env
  mongoURL: process.env.mongoURL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
