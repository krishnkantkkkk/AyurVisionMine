import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
  HOST: process.env.HOST,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  DB_URI: process.env.DB_URI,
  JWT_KEY: (!process.env.JWT_KEY || process.env.JWT_KEY.startsWith('<')) ? 'ayurvision_jwt_secret_key_2026' : process.env.JWT_KEY,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || process.env.JWT_KEY || 'ayurvision_access_secret_key_2026',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'ayurvision_refresh_secret_key_2026',
  ML_API_URL: process.env.ML_API_URL,
};

export default env;